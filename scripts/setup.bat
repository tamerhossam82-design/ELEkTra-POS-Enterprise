@echo off
echo ========================================
echo  ELEkTra POS Enterprise - Setup
echo ========================================
echo.

echo [1/5] Installing dependencies...
call npm install
if errorlevel 1 goto error

echo [2/5] Generating Prisma client...
cd packages\database
call npx prisma generate
if errorlevel 1 goto error
cd ..\..

echo [3/5] Running database migrations...
cd packages\database
call npx prisma migrate deploy
if errorlevel 1 (
  echo Running initial migration...
  call npx prisma migrate dev --name init
)
if errorlevel 1 goto error
cd ..\..

echo [4/5] Seeding database...
cd packages\database
call npx tsx prisma/seed.ts
if errorlevel 1 goto error
cd ..\..

echo [5/5] Setting up Git hooks...
call npx husky
if errorlevel 1 goto error

echo.
echo ========================================
echo  Setup complete!
echo  Run: npm run dev
echo  Login: admin / admin123
echo ========================================
goto end

:error
echo.
echo Setup failed. Check errors above.
exit /b 1

:end
