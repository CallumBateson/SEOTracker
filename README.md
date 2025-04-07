# SEO Tracker
## Overview 
This repository contains the server and client code for a web application designed to track the google rankings of a webpage given certain search terms.

Users running the client can create **Watchers**. A **Watcher** is an entity which will track the google rankings of a given website for when specific search terms are entered. Once created a **Watcher** will automatically generate results each day at 00:00 UTC. The option also exists for a user to manually trigger the results generation for a **Watcher**, overriding the results for the current day with a newly generated set of results.

Due to issues accessing Google results programmatically without using their API, this application is running in **demo mode**. Meaning that the results are randomly generated for each **Watcher**. To disable demo mode, simply change the flag in `WatcherService.cs` `ln 11` to `false`.

## Startup Guide

1. Clone the repository to your local device.
2. Create a new database using SQL Express and generate a suitable connection string.
3. Install the Node and NPM package managers.
4. Install the latest .NET 8 hosting bundle.
5. Install Visual Studio 2022 Community Edition.
6. In Visual Studio, install the following workloads (.Net desktop development, ASP.NET  and Web Development, Data Storage and Processing).
7. Open up the `SEOTracker.sln` in Visual Studio.
8. In the Package Manager Console (or other suitable terminal) navigate to the `seotracker.client` folder and download the required packages with `npm i -f`.
9. In the Package Manager Console, change the default project to the Database project and run the following commands:
    ```
    Install-Package Microsoft.EntityFrameworkCore.Tools
    Update-Database -Connection "[YOUR CONNECTION STRING HERE]"
    ```
    **Alternatively**: <details><summary>Run the following script on your database</summary>
   ```
   CREATE TABLE [dbo].[Watcher](
    	[Id] [int] IDENTITY(1,1) NOT NULL,
    	[Name] [nvarchar](max) NOT NULL,
    	[SearchTerm] [nvarchar](max) NOT NULL,
    	[TargetUrl] [nvarchar](max) NOT NULL,
     CONSTRAINT [PK_Watcher] PRIMARY KEY CLUSTERED 
    (
    	[Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
    
    CREATE TABLE [dbo].[WatcherResult](
    	[Id] [int] IDENTITY(1,1) NOT NULL,
    	[WatcherId] [int] NOT NULL,
    	[CreationDate] [datetime2](7) NOT NULL,
    	[Index] [int] NOT NULL,
     CONSTRAINT [PK_WatcherResult] PRIMARY KEY CLUSTERED 
    (
    	[Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
    
    CREATE NONCLUSTERED INDEX [IX_WatcherResult_WatcherId] ON [dbo].[WatcherResult]
    (
    	[WatcherId] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    
    ALTER TABLE [dbo].[WatcherResult]  WITH CHECK ADD  CONSTRAINT [FK_WatcherResult_Watcher_WatcherId] FOREIGN KEY([WatcherId])
    REFERENCES [dbo].[Watcher] ([Id])
    ON DELETE CASCADE
    GO
    
    ALTER TABLE [dbo].[WatcherResult] CHECK CONSTRAINT [FK_WatcherResult_Watcher_WatcherId]
    GO
    ```
   </details>
11. Override the `DBConnectionString` property in `SEOTracker.Server/appsettings.json` to your connection string.
12. Ensure that both the Client and Server projects are set as startup projects, click start in Visual Studio and accept any local certificates. This will automatically open a browser running the client code.
13. Create a watcher with the search term: `land registry searches` and target url: `www.infotrack.co.uk`.
