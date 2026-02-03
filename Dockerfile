# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY TodoApi/TodoApi.csproj TodoApi/
RUN dotnet restore "TodoApi/TodoApi.csproj"

COPY TodoApi/ TodoApi/
WORKDIR /src/TodoApi
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

ENV PORT=8080 \
    ASPNETCORE_URLS=http://+:${PORT} \
    ASPNETCORE_ENVIRONMENT=Production

RUN mkdir -p /var/data

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "TodoApi.dll"]
