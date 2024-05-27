BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[AssetType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [AssetType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [AssetType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Asset] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    [parentAssetId] INT,
    [assetTypeId] INT NOT NULL,
    CONSTRAINT [Asset_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Asset_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Target] (
    [id] INT NOT NULL IDENTITY(1,1),
    [productionTarget] DECIMAL(32,16) NOT NULL,
    [energyConsumptionTarget] DECIMAL(32,16) NOT NULL,
    [specificEnergyConsupmtionTarget] DECIMAL(32,16) NOT NULL,
    [CO2EmissionTarget] DECIMAL(32,16) NOT NULL,
    [assetId] INT NOT NULL,
    CONSTRAINT [Target_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Target_assetId_key] UNIQUE NONCLUSTERED ([assetId])
);

-- CreateTable
CREATE TABLE [dbo].[AttributeType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [AttributeType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [AttributeType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Attribute] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    [assetId] INT NOT NULL,
    [attributeTypeId] INT NOT NULL,
    CONSTRAINT [Attribute_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Unit] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [Unit_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Unit_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[PHDTag] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tagname] VARCHAR(300) NOT NULL,
    [unitId] INT NOT NULL,
    CONSTRAINT [PHDTag_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PHDTag_tagname_key] UNIQUE NONCLUSTERED ([tagname])
);

-- CreateTable
CREATE TABLE [dbo].[Assignment] (
    [attributeId] INT NOT NULL,
    [PHDTagId] INT NOT NULL,
    CONSTRAINT [Assignment_pkey] PRIMARY KEY CLUSTERED ([attributeId],[PHDTagId])
);

-- CreateTable
CREATE TABLE [dbo].[AggregationType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(50) NOT NULL,
    CONSTRAINT [AggregationType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Record] (
    [id] INT NOT NULL IDENTITY(1,1),
    [value] DECIMAL(32,16) NOT NULL,
    [PHDTagId] INT NOT NULL,
    [timestamp] VARCHAR(300) NOT NULL,
    [aggregationTypeId] INT NOT NULL,
    CONSTRAINT [Record_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Constant] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    [value] DECIMAL(32,16) NOT NULL,
    CONSTRAINT [Constant_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Constant_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[DataSource] (
    [id] INT NOT NULL IDENTITY(1,1),
    [host] VARCHAR(300) NOT NULL,
    [port] INT NOT NULL,
    [schedule] VARCHAR(255) NOT NULL,
    CONSTRAINT [DataSource_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(50) NOT NULL,
    [password] VARCHAR(1024) NOT NULL,
    [isAdmin] BIT NOT NULL CONSTRAINT [User_isAdmin_df] DEFAULT 0,
    [joined_at] DATETIME NOT NULL CONSTRAINT [User_joined_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- AddForeignKey
ALTER TABLE [dbo].[Asset] ADD CONSTRAINT [Asset_parentAssetId_fkey] FOREIGN KEY ([parentAssetId]) REFERENCES [dbo].[Asset]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Asset] ADD CONSTRAINT [Asset_assetTypeId_fkey] FOREIGN KEY ([assetTypeId]) REFERENCES [dbo].[AssetType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Target] ADD CONSTRAINT [Target_assetId_fkey] FOREIGN KEY ([assetId]) REFERENCES [dbo].[Asset]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Attribute] ADD CONSTRAINT [Attribute_attributeTypeId_fkey] FOREIGN KEY ([attributeTypeId]) REFERENCES [dbo].[AttributeType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Attribute] ADD CONSTRAINT [Attribute_assetId_fkey] FOREIGN KEY ([assetId]) REFERENCES [dbo].[Asset]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PHDTag] ADD CONSTRAINT [PHDTag_unitId_fkey] FOREIGN KEY ([unitId]) REFERENCES [dbo].[Unit]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Assignment] ADD CONSTRAINT [Assignment_attributeId_fkey] FOREIGN KEY ([attributeId]) REFERENCES [dbo].[Attribute]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Assignment] ADD CONSTRAINT [Assignment_PHDTagId_fkey] FOREIGN KEY ([PHDTagId]) REFERENCES [dbo].[PHDTag]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Record] ADD CONSTRAINT [Record_PHDTagId_fkey] FOREIGN KEY ([PHDTagId]) REFERENCES [dbo].[PHDTag]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Record] ADD CONSTRAINT [Record_aggregationTypeId_fkey] FOREIGN KEY ([aggregationTypeId]) REFERENCES [dbo].[AggregationType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
