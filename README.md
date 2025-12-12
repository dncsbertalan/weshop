# Megosztott bevásárlókosár megvalósítása React és .NET alapokon

Szakdolgozatomban egy megosztott bevásárlókosarat valósítottam meg React és .NET alapokon.

## Az alkalmazás futtatása

### Követelmények

A projekt futtatásához Visual Studio Code és Rider (vagy Visual Studio) alkalmazásokra van szükség. Az adatbázisszerver elindításához a Microsoft SQL Express alkalmazás szükséges, vagy a Microsft SQL Server 2022 konténerben történő futtatása.

Az adatbázis connection stringjét a backend/WeShop/WebAPI/appSettings.json fájlban a ConnectionStrings.DefaultConnection értékének megadásával lehet módosítani.

Az alkalmazás használatához szükség van .NET 9-re, minimum Node.js 20.-ra, és minimum npm 10.-re.

### A szerveroldali alkalmazás elindítása

- Nyissuk meg a backend/WeShop/WeShop.sln projektet Riderben.
- A menüben válasszuk a Tool/Entity Framework Core/Update Database opciót.
- A megjelenő ablakban automatikusan a legutolsó migráció verzió kerül kiválasztásra, ha ez nem történt meg, válasszuk ezt ki.
- Válasszuk a Migration Projectnek a DataAccess-t, Startup projectnek pedig a WebAPI-t.
- Nyomjunk egy OK-t, és várjuk meg amíg a migráció lefut.
- Ezután válasszuk ki a WebAPI: https konfigurációt, majd indítsuk el az Run gomb megnyomásával.

### A kliensoldali alkalmazás elindítása

- Nyissuk meg a Visual Studio Code-ot, majd a menüsorból a File/Open folder... opciót választva nyissuk meg a frontend/project_frontend mappát
- A menüsorból válasszuk ki a View/Terminal opciót, majd írjuk be a következő parancsokat:

  <code>npm install</code>

  <code>npm run dev</code>

- Ezután command/control + klikkel a megjelenő http://localhost:5173/ linken elérhetővé válik az alkalmazás.

Az alkalmazás automatikusan tartalmaz egy admin felhasználót a következő azonosítókkal:

- e-mail: <code>admin@weshop.hu</code>
- e-mail: <code>Admin123!</code>
