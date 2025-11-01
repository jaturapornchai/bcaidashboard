# 🚀 BC AI Dashboard - Deployment Guide

## 📋 Overview
คู่มือการ Deploy แดชบอร์ด BC AI Dashboard สำหรับ Production

---

## 🔐 Environment Variables Setup

### 1. **สร้างไฟล์ Environment Variables**

สำหรับ Production ใช้ไฟล์ `.env.production`:

```bash
# คัดลอกจาก template
cp .env.example .env.production
```

### 2. **ตั้งค่า Environment Variables**

แก้ไขไฟล์ `.env.production` ให้ครบทุกค่า:

```bash
# OpenRouter API
OPENROUTER_API_KEY=sk-or-v1-your-real-key
OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions

# ElevenLabs TTS
ELEVENLABS_API_KEY=sk_your-real-key

# Dashboard API Secret (สร้างใหม่สำหรับ Production)
DASHBOARD_API_SECRET=your-secure-production-secret
NEXT_PUBLIC_DASHBOARD_API_SECRET=your-secure-production-secret

# Security (สร้างใหม่สำหรับ Production - ต้อง 32 ตัวอักษร)
API_KEY_ENCRYPTION_KEY=32characters-long-encryption-key
RATE_LIMIT_ENABLED=true
MAX_REQUESTS_PER_MINUTE=60

# Production Environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🛠️ Deployment Platforms

### **Option 1: Vercel (แนะนำ)**

#### **ขั้นตอน:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

4. **ตั้งค่า Environment Variables ใน Vercel Dashboard**
   - ไปที่ Project Settings → Environment Variables
   - เพิ่มทุกค่าจาก `.env.production`
   - เลือก Environment: Production

#### **Environment Variables ใน Vercel:**
```
OPENROUTER_API_KEY = sk-or-v1-xxx
OPENROUTER_API_URL = https://openrouter.ai/api/v1/chat/completions
ELEVENLABS_API_KEY = sk_xxx
DASHBOARD_API_SECRET = xxx
NEXT_PUBLIC_DASHBOARD_API_SECRET = xxx
API_KEY_ENCRYPTION_KEY = xxx
RATE_LIMIT_ENABLED = true
MAX_REQUESTS_PER_MINUTE = 60
NODE_ENV = production
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
```

---

### **Option 2: Netlify**

#### **ขั้นตอน:**

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build Project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

4. **ตั้งค่า Environment Variables ใน Netlify**
   - Site settings → Build & deploy → Environment
   - เพิ่มทุกค่าจาก `.env.production`

---

### **Option 3: Self-Hosted (VPS/Cloud)**

#### **สำหรับ Ubuntu/Debian Server:**

1. **Clone Repository**
```bash
git clone https://github.com/jaturapornchai/bcaidashboard.git
cd bcaidashboard
```

2. **Install Dependencies**
```bash
npm install
```

3. **สร้างไฟล์ .env.production**
```bash
nano .env.production
# วางค่า environment variables ทั้งหมด
```

4. **Build Production**
```bash
npm run build
```

5. **Start Production Server**
```bash
npm start
```

6. **ใช้ PM2 เพื่อรัน Background**
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "bcaidashboard" -- start

# Save PM2 configuration
pm2 save

# Auto-start on boot
pm2 startup
```

7. **ตั้งค่า Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **ตั้งค่า SSL ด้วย Certbot**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### **Option 4: Docker**

#### **สร้าง Dockerfile:**

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy environment variables
COPY .env.production .env.production

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### **Build & Run Docker:**

```bash
# Build image
docker build -t bcaidashboard .

# Run container
docker run -p 3000:3000 --env-file .env.production bcaidashboard
```

---

## 🔒 Security Checklist

### **ก่อน Deploy:**

- [ ] สร้าง API Secret ใหม่สำหรับ Production
- [ ] สร้าง Encryption Key ใหม่ (32 characters)
- [ ] ตรวจสอบว่า `.env.production` ไม่ถูก commit ลง Git
- [ ] เปลี่ยน `NEXT_PUBLIC_APP_URL` เป็น domain จริง
- [ ] เปิดใช้งาน Rate Limiting
- [ ] ตั้งค่า CORS ให้ถูกต้อง

### **หลัง Deploy:**

- [ ] ทดสอบ AI Analysis
- [ ] ทดสอบ Text-to-Speech
- [ ] ตรวจสอบ API Rate Limiting
- [ ] ตรวจสอบ HTTPS/SSL Certificate
- [ ] ทดสอบความเร็วการโหลด
- [ ] ตรวจสอบ Console Errors

---

## 📊 Build & Production Commands

```bash
# Development
npm run dev          # รัน development server

# Production Build
npm run build        # Build สำหรับ production

# Production Start
npm start            # รัน production server (หลัง build)

# Lint Check
npm run lint         # ตรวจสอบ code quality
```

---

## 🌐 Domain & DNS Setup

### **ตั้งค่า DNS Records:**

```
Type    Name    Value
A       @       your-server-ip
CNAME   www     your-domain.com
```

### **อัปเดต Environment Variable:**

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🔄 CI/CD Pipeline (Optional)

### **GitHub Actions Example:**

สร้างไฟล์ `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
        ELEVENLABS_API_KEY: ${{ secrets.ELEVENLABS_API_KEY }}
        DASHBOARD_API_SECRET: ${{ secrets.DASHBOARD_API_SECRET }}
        NEXT_PUBLIC_DASHBOARD_API_SECRET: ${{ secrets.NEXT_PUBLIC_DASHBOARD_API_SECRET }}
    
    - name: Deploy to Vercel
      run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📈 Monitoring & Logs

### **Production Monitoring:**

1. **Vercel Analytics** (ถ้าใช้ Vercel)
2. **Google Analytics**
3. **Error Tracking:** Sentry
4. **Performance:** Lighthouse CI

### **Log Management:**

```bash
# ดู logs ใน PM2
pm2 logs bcaidashboard

# ดู logs แบบ realtime
pm2 logs bcaidashboard --lines 100
```

---

## 🆘 Troubleshooting

### **ปัญหาที่พบบ่อย:**

**1. API 401 Unauthorized**
- ตรวจสอบว่าตั้งค่า `NEXT_PUBLIC_DASHBOARD_API_SECRET` ถูกต้อง
- Restart server หลังเปลี่ยน environment variables

**2. Build Failed**
- ลบ `.next` folder: `rm -rf .next`
- ลบ `node_modules`: `rm -rf node_modules && npm install`
- Run build อีกครั้ง: `npm run build`

**3. API Rate Limited**
- ปรับค่า `MAX_REQUESTS_PER_MINUTE` ใน environment
- ตรวจสอบ Rate Limit headers

**4. AI Analysis ไม่ทำงาน**
- ตรวจสอบ `OPENROUTER_API_KEY`
- ตรวจสอบ quota ของ API key

---

## 📞 Support

- **GitHub Issues:** https://github.com/jaturapornchai/bcaidashboard/issues
- **Documentation:** `/docs` folder

---

## ✅ Deployment Checklist

- [ ] Clone repository
- [ ] Install dependencies
- [ ] Copy `.env.example` to `.env.production`
- [ ] ตั้งค่า environment variables ทั้งหมด
- [ ] Run `npm run build` ทดสอบ
- [ ] เลือก deployment platform
- [ ] Deploy to production
- [ ] ตั้งค่า DNS (ถ้ามี custom domain)
- [ ] ตั้งค่า SSL/HTTPS
- [ ] ทดสอบทุกฟีเจอร์
- [ ] Setup monitoring
- [ ] Backup environment variables

**พร้อม Deploy! 🚀**
