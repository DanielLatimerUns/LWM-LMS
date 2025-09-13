FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8000
  
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# add node
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -yq nodejs build-essential
RUN mkdir "/.aspnet"
RUN mkdir "/.aspnet/https"

ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["LWM.Server/LWM.Server.csproj", "LWM.Server/"]
COPY ["lwm.client/lwm.client.esproj", "lwm.client/"]
RUN dotnet restore "LWM.Server/LWM.Server.csproj"
COPY . .
WORKDIR "/src/LWM.Server"
RUN dotnet build "./LWM.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LWM.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LWM.Server.dll"]
