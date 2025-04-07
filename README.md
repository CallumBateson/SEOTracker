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
10. Override the `DBConnectionString` property in `SEOTracker.Server/appsettings.json` to your connection string.
11. Ensure that both the Client and Server projects are set as startup projects, click start in Visual Studio and accept any local certificates. This will automatically open a browser running the client code.
12. Create a watcher with the search term: `land registry searches` and target url: `www.infotrack.co.uk`.
