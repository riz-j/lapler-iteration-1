# Use the official Microsoft .NET SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

# Set the working directory
WORKDIR /app

# Copy the project files and restore the dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining source files and build the application
COPY . ./
RUN dotnet publish -c Release -o out

# Use the official Microsoft .NET Runtime image as the base image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0

# Set the working directory
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build-env /app/out .

# Expose the port that the Web API will run on
EXPOSE 5080

# Set the entrypoint to start the application
ENTRYPOINT ["dotnet", "rest-api-v2.dll"]
