FROM  mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["LWM.Api/LWM.Api.csproj", "LWM.Api/"]
COPY ["LWM.Authentication/LWM.Authentication.csproj", "LWM.Authentication/"]
COPY ["LWM.Data/LWM.Data.csproj", "LWM.Data/"]
RUN dotnet restore "LWM.Data/LWM.Data.csproj"
RUN dotnet restore "LWM.Authentication/LWM.Authentication.csproj"
RUN dotnet restore "LWM.Api/LWM.Api.csproj"
COPY . .
WORKDIR "/src/LWM.Api"

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LWM.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LWM.Api.dll"]
