@echo off
chcp 65001 >nul
title 共感方程式 · Empathy Equation 启动器
echo ========================================================
echo       共感方程式 · The Empathy Equation
echo   美妆电商全域智能客服与风控平台 (阿里开源 Qwen2.5 驱动)
echo ========================================================
echo.
echo [1/2] 正在检查依赖并启动本地开发服务器...
echo [2/2] 请稍候，服务启动后会自动打开浏览器，默认地址: http://localhost:3000
echo.
npm run dev
pause
