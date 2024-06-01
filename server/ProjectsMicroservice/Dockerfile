FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ProjectsMicroservice/ProjectsMicroservice.csproj", "ProjectsMicroservice/"]
RUN dotnet restore "ProjectsMicroservice/ProjectsMicroservice.csproj"
COPY . .
WORKDIR "/src/ProjectsMicroservice"
RUN dotnet build "ProjectsMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ProjectsMicroservice.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProjectsMicroservice.dll"]
