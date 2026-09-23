#!/usr/bin/env python3
from pathlib import Path
import sys,re
if len(sys.argv)!=2:
    raise SystemExit('Usage: python configure-domain.py https://www.example.com')
domain=sys.argv[1].rstrip('/')
if not re.match(r'^https?://[^/]+$',domain):
    raise SystemExit('Enter only the site origin, e.g. https://www.example.com')
root=Path(__file__).resolve().parent
for name in ['sitemap.xml','robots.txt']:
    p=root/name;t=p.read_text(encoding='utf-8');t=t.replace('https://YOUR-DOMAIN.example',domain);p.write_text(t,encoding='utf-8')
print('Configured sitemap.xml and robots.txt for',domain)
