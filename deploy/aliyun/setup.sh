#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/routey"
DOMAIN="routey.top"

echo "=== 1/4  创建应用目录 ==="
sudo mkdir -p "$APP_DIR"

echo "=== 2/4  部署应用代码 ==="
cd "$APP_DIR"
if [ -f package.json ]; then
  npm install --omit=dev
  echo "  -> 依赖安装完成"
fi

echo "=== 3/4  配置 Nginx ==="
sudo cp deploy/aliyun/nginx.conf "/etc/nginx/sites-available/$DOMAIN"
sudo ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
sudo nginx -t && sudo systemctl reload nginx

if command -v certbot &>/dev/null; then
  sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" || true
else
  sudo apt install -y certbot python3-certbot-nginx 2>/dev/null || sudo yum install -y certbot python3-certbot-nginx 2>/dev/null
  sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" || true
fi

echo "=== 4/4  启动应用 ==="
cd "$APP_DIR"
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup | tail -1 | bash || true

echo ""
echo "========================================="
echo "  部署完成！"
echo "  https://$DOMAIN"
echo "========================================="
echo ""
echo "后续操作："
echo "  1. 确认域名 DNS A 记录指向本机 IP"
echo "  2. 如需修改端口，编辑 ecosystem.config.cjs"
