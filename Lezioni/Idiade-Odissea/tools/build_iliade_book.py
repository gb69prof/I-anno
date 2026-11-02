#!/usr/bin/env python3
"""Volume A4 illustrato dell'Iliade. Legge il JSON già pubblicato: non riscrive i contenuti."""
import html, json
from pathlib import Path
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

W,H=A4
NAVY=HexColor('#153E77');BURGUNDY=HexColor('#931E3C');GREEN=HexColor('#4F8354')
GOLD=HexColor('#C4A36B');TEXT=HexColor('#22262B');MUTED=HexColor('#5C656A')
PAPER=HexColor('#FAF9F5');BLUE=HexColor('#EEF4F6');BEIGE=HexColor('#F6F0E4')
LINE=HexColor('#CDD2D0');WHITE=HexColor('#FFFFFF')
FD=Path('/usr/share/fonts/truetype/dejavu')
for tag,file in [('BookSerif','DejaVuSerif.ttf'),('BookSerifBold','DejaVuSerif-Bold.ttf'),
                 ('BookSerifItalic','DejaVuSerif-Italic.ttf'),('BookSans','DejaVuSans.ttf'),
                 ('BookSansBold','DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(tag,str(FD/file)))
pdfmetrics.registerFontFamily('BookSerif',normal='BookSerif',bold='BookSerifBold',italic='BookSerifItalic')

def safe(s):
    return html.escape(str(s),quote=False).replace('\n','<br/>')

class Book:
    def __init__(self,out,root,stages):
        self.c=canvas.Canvas(str(out),pagesize=A4,pageCompression=1)
        self.c.setTitle("L'Iliade in otto tappe - Libro illustrato")
        self.c.setAuthor('gbprof - Percorso didattico')
        self.root=Path(root);self.stages=stages;self.page=0;self.errors=[];self.cache={}
    def bg(self):
        self.c.setFillColor(PAPER);self.c.rect(0,0,W,H,fill=1,stroke=0)
    def p(self,s,x,top,width,size=9.2,lead=None,color=TEXT,font='BookSerif',bottom=None,align=0):
        style=ParagraphStyle('t',fontName=font,fontSize=size,leading=lead or size*1.43,
                             textColor=color,spaceBefore=0,spaceAfter=0,alignment=align)
        a=Paragraph(safe(s),style);_,h=a.wrap(width,10000)
        if bottom is not None and top-h<bottom:
            self.errors.append(f'Pagina {self.page}: testo sotto la soglia ({top-h:.1f} < {bottom:.1f})')
        a.drawOn(self.c,x,top-h);return top-h
    def label(self,s,x,y,size=8.1,color=MUTED):
        self.c.setFillColor(color);self.c.setFont('BookSansBold',size);self.c.drawString(x,y,s)
    def tab(self,i,books='',cont=False):
        self.bg();self.c.setFillColor(BURGUNDY);self.c.rect(0,H-29,133,29,stroke=0,fill=1)
        self.c.setFillColor(WHITE);self.c.setFont('BookSansBold',9.2)
        self.c.drawString(29,H-19,'CAPITOLO '+str(i))
        self.label('L’ILIADE · '+('CONTINUA' if cont else books),150,H-19,8.1)
        self.c.setStrokeColor(LINE);self.c.line(29,H-42,W-29,H-42)
    def footer(self):
        self.c.setStrokeColor(LINE);self.c.line(29,45,W-29,45)
        self.label('gbprof.it  ·  L’ILIADE IN OTTO TAPPE',29,28,7.1)
        self.c.setFillColor(NAVY);self.c.setFont('BookSansBold',9)
        self.c.drawRightString(W-30,28,str(self.page))
    def next(self):self.c.showPage()
    def art(self,i,x,y,w,h):
        path=self.root/'assets'/'images'/'iliade-otto-fumetto'/f'tappa-{i:02}.webp'
        if path not in self.cache:
            with Image.open(path) as im:self.cache[path]=ImageReader(im.convert('RGB').copy())
        self.c.setFillColor(NAVY);self.c.roundRect(x-2,y-2,w+4,h+4,5,fill=1,stroke=0)
        self.c.drawImage(self.cache[path],x,y,width=w,height=h,preserveAspectRatio=True,mask='auto')
    def section(self,n,title,body,x,top,width,bottom=110):
        self.c.setFillColor(NAVY);self.c.circle(x+9,top-11,9,fill=1,stroke=0)
        self.c.setFillColor(WHITE);self.c.setFont('BookSansBold',8)
        self.c.drawCentredString(x+9,top-14,str(n))
        after=self.p(title,x+24,top-2,width-24,size=10.6,lead=13.6,font='BookSerifBold',color=NAVY)
        return self.p(body,x,after-8,width,size=9.6,lead=13.8,bottom=bottom)-17
    def note(self,x,y,w,h,tag,txt):
        self.c.setFillColor(BLUE);self.c.setStrokeColor(HexColor('#B7C9D6'))
        self.c.roundRect(x,y,w,h,5,fill=1,stroke=1)
        self.label(tag,x+11,y+h-18,7.3,NAVY)
        self.p(txt,x+11,y+h-27,w-22,size=8.4,lead=12,bottom=y+7)
    def cover(self):
        self.page+=1;self.bg()
        self.c.setFillColor(NAVY);self.c.rect(0,572,W,270,stroke=0,fill=1)
        self.c.setFillColor(GOLD);self.c.rect(33,753,4,55,stroke=0,fill=1)
        self.label('QUADERNI DI LETTURA  ·  EPICA',52,791,9.1,HexColor('#E3D9C5'))
        self.c.setFillColor(WHITE);self.c.setFont('BookSerifBold',49);self.c.drawString(48,698,'L’ILIADE')
        self.c.setFillColor(HexColor('#EEE5D2'));self.c.setFont('BookSerifItalic',19)
        self.c.drawString(50,656,'Otto tappe dall’ira alla pietà')
        self.c.setFont('BookSans',11);self.c.drawString(51,615,'Racconti · Tavole a fumetti · Mappe concettuali · Verifiche')
        self.art(1,178,275,239,239)
        self.c.setFillColor(BURGUNDY);self.c.roundRect(165,241,266,28,5,fill=1,stroke=0)
        self.c.setFillColor(WHITE);self.c.setFont('BookSansBold',9.4)
        self.c.drawCentredString(W/2,251,'LIBRI I - XXIV  ·  PERCORSO IN OTTO CAPITOLI')
        self.label('DALLA COLLERA DI ACHILLE ALL’INCONTRO CON PRIAMO',80,204,9.5,NAVY)
        self.c.setStrokeColor(GOLD);self.c.line(80,189,W-80,189)
        self.p('Un percorso di lettura per comprendere gli eroi, le scelte e le contraddizioni del poema attribuito a Omero.',
               80,172,W-160,size=11.2,lead=17,align=1)
        self.label('GBPROF · I ANNO',29,29,8.4,NAVY);self.next()
    def index(self):
        self.page+=1;self.tab(0,'INDICE')
        self.c.setFillColor(NAVY);self.c.setFont('BookSerifBold',32)
        self.c.drawString(34,739,'Indice dei capitoli')
        self.p('Otto momenti del poema, otto percorsi per leggere la guerra attraverso le persone che la vivono.',
               35,714,510,size=10.2,lead=15)
        for j,e in enumerate(self.stages):
            col=j//4;row=j%4;x=34+col*272;y=633-row*137
            self.art(j+1,x,y-4,90,90)
            self.c.setFillColor(NAVY);self.c.circle(x+108,y+74,11,fill=1,stroke=0)
            self.c.setFillColor(WHITE);self.c.setFont('BookSansBold',9.2)
            self.c.drawCentredString(x+108,y+71,str(j+1))
            bot=self.p(e['title'],x+127,y+89,125,size=11.4,lead=15,color=NAVY,font='BookSerifBold')
            self.p(e.get('bookLabel','LIBRO '+e.get('book','')),x+127,bot-12,120,size=8,lead=11,color=MUTED,font='BookSansBold')
            self.label('PAG. '+str(3+j*3),x+127,y+12,8.4,BURGUNDY)
            self.c.setStrokeColor(LINE);self.c.line(x,y-22,x+250,y-22)
        self.footer();self.next()
    def opening(self,i,e):
        self.page+=1;self.tab(i,e.get('bookLabel',''));left=29;right=311;cw=255
        font=23.3 if len(e['title'])>30 else 26.2
        lead=27.8 if len(e['title'])>30 else 30.6
        bot=self.p(e['title'],29,774,322,size=font,lead=lead,font='BookSerifBold',color=NAVY,bottom=695)
        self.label(e.get('theme',''),30,bot-15,9.1,BURGUNDY)
        self.p(e.get('summary',''),30,bot-37,308,size=9.2,lead=13.1,bottom=595)
        self.art(i,355,548,210,210)
        self.c.setFillColor(BEIGE);self.c.setStrokeColor(GOLD)
        self.c.roundRect(29,550,309,64,5,fill=1,stroke=1)
        self.label('DAL TESTO DI OMERO · PASSO GUIDA',40,598,7.1,BURGUNDY)
        self.p(e.get('verse',''),41,586,284,size=10.2,lead=14.7,font='BookSerifItalic',bottom=555)
        self.c.setStrokeColor(LINE);self.c.line(29,530,W-29,530)
        ps=e['paragraphs'];heads=e['paragraphTitles'];ly=513
        for k in (0,1):ly=self.section(k+1,heads[k],ps[k],left,ly,cw,bottom=124)
        self.section(3,heads[2],ps[2],right,513,cw,bottom=257)
        self.note(right,126,cw,112,'PER COMPRENDERE',e.get('thought',''))
        self.c.setFillColor(BEIGE);self.c.setStrokeColor(GOLD)
        self.c.roundRect(29,54,537,52,6,fill=1,stroke=1)
        self.label('UNA DOMANDA PER PENSARE',40,91,7.2,BURGUNDY)
        self.p(e.get('question',''),40,82,514,size=9.2,lead=12.6,bottom=59)
        if ly<109:self.errors.append(f'Pagina {self.page}: narrazione sx invade il richiamo ({ly})')
        self.footer();self.next()
    def map(self,e,top):
        self.c.setFillColor(BURGUNDY);self.c.roundRect(29,top-20,537,20,3,fill=1,stroke=0)
        self.c.setFillColor(WHITE);self.c.setFont('BookSansBold',8.7)
        self.c.drawString(42,top-14,'SCHEMA DI SINTESI')
        self.c.setFillColor(BEIGE);self.c.rect(29,top-39,537,19,fill=1,stroke=0)
        self.label(e['map']['center'][:76],39,top-33,8,NAVY)
        y=top-42
        for k,(name,detail) in enumerate(e['map']['nodes']):
            x=29+(k%2)*270;yy=y-(k//2+1)*40
            self.c.setFillColor(WHITE);self.c.setStrokeColor(LINE)
            self.c.rect(x,yy,267,40,fill=1,stroke=1)
            self.label(name[:32],x+7,yy+27,7.4,NAVY)
            self.p(detail,x+7,yy+21,252,size=7.2,lead=8.8,bottom=yy+2)
        bot=y-80
        self.c.setFillColor(BEIGE);self.c.rect(29,bot-21,537,21,fill=1,stroke=0)
        self.p(e['map'].get('takeaway',''),40,bot-4,516,size=7.7,lead=9.2,bottom=bot-20)
        return bot-24
    def quiz(self,e,top):
        self.c.setFillColor(GREEN);self.c.roundRect(29,top-25,537,25,3,fill=1,stroke=0)
        self.c.setFillColor(WHITE);self.c.setFont('BookSansBold',9)
        self.c.drawString(42,top-17,'DOMANDE PER METTERSI ALLA PROVA')
        self.c.setFillColor(HexColor('#F3F7F0'));self.c.setStrokeColor(HexColor('#C3D3BF'))
        self.c.roundRect(29,top-169,537,144,3,fill=1,stroke=1)
        for k,q in enumerate(e['quiz'][:4]):
            x=39+(k%2)*265;y=top-36-(k//2)*70
            self.c.setFillColor(GREEN);self.c.circle(x+9,y-9,9,fill=1,stroke=0)
            self.c.setFillColor(WHITE);self.c.setFont('BookSansBold',8)
            self.c.drawCentredString(x+9,y-12,str(k+1))
            b=self.p(q[0],x+23,y+1,230,size=8.5,lead=11.2,font='BookSerifBold',bottom=y-28)
            for j,option in enumerate(q[1]):
                pos=b-2-j*13
                self.c.setStrokeColor(HexColor('#8B998B'));self.c.circle(x+27,pos-4,3,fill=0,stroke=1)
                self.p(option,x+35,pos,213,size=7.6,lead=9.4,bottom=y-69)
        return top-173
    def continuation(self,i,e):
        self.page+=1;self.tab(i,e.get('bookLabel',''),cont=True)
        self.p(e['title'],30,765,532,size=18.4,lead=22.5,color=NAVY,font='BookSerifBold',bottom=715)
        self.label('IL RACCONTO CONTINUA',30,716,8.1,BURGUNDY)
        ps=e['paragraphs'];heads=e['paragraphTitles'];ly=699
        for k in (3,4):ly=self.section(k+1,heads[k],ps[k],29,ly,255,bottom=257)
        ry=self.section(6,heads[5],ps[5],311,699,255,bottom=263)
        if min(ly,ry)<251:self.errors.append(f'Pagina {self.page}: narrazione invade lo schema ({ly}, {ry})')
        mapbottom=self.map(e,230)
        if mapbottom<70:self.errors.append(f'Pagina {self.page}: mappa oltre la soglia ({mapbottom})')
        self.footer();self.next()
    def exercise(self,i,e):
        self.page+=1;self.tab(i,'ESERCIZI')
        self.p('Verifica di comprensione',30,766,430,size=24,lead=29,color=NAVY,font='BookSerifBold')
        self.label(e['title'],30,716,9.0,BURGUNDY)
        self.art(i,447,587,115,115)
        self.c.setFillColor(BEIGE);self.c.setStrokeColor(GOLD)
        self.c.roundRect(29,587,398,104,5,fill=1,stroke=1)
        self.label('IL PUNTO DA RICORDARE',42,672,8,BURGUNDY)
        self.p(e['map'].get('takeaway',''),42,658,370,size=10.2,lead=14.3,bottom=607)
        self.label('DOMANDE PER METTERSI ALLA PROVA',30,580,8.3,GREEN)
        self.c.setStrokeColor(LINE);self.c.line(29,565,W-29,565)
        for k,q in enumerate(e['quiz'][:4]):
            top=553-k*119
            self.c.setFillColor(HexColor('#F3F7F0'));self.c.setStrokeColor(HexColor('#BDD2B9'))
            self.c.roundRect(29,top-109,537,109,5,fill=1,stroke=1)
            self.c.setFillColor(GREEN);self.c.circle(48,top-20,11,fill=1,stroke=0)
            self.c.setFillColor(WHITE);self.c.setFont('BookSansBold',9)
            self.c.drawCentredString(48,top-23,str(k+1))
            bot=self.p(q[0],68,top-8,482,size=10.1,lead=13.5,font='BookSerifBold',bottom=top-41)
            for j,option in enumerate(q[1]):
                oy=bot-8-j*18
                self.c.setStrokeColor(GREEN);self.c.circle(79,oy-4,4,fill=0,stroke=1)
                self.p(option,94,oy,451,size=8.9,lead=12.2,bottom=top-105)
        self.footer();self.next()
    def ending(self):
        self.page+=1;self.tab(9,'LETTURA FINALE')
        self.c.setFillColor(NAVY);self.c.setFont('BookSerifBold',28)
        self.c.drawString(29,751,'Dall’ira alla pietà')
        self.p('Otto episodi, otto temi per rileggere il poema attraverso i personaggi e le loro decisioni.',
               30,724,490,size=10.1,lead=15)
        for i,e in enumerate(self.stages):
            x=30+(i%2)*275;top=656-(i//2)*144
            self.c.setFillColor(NAVY);self.c.circle(x+12,top-13,11,fill=1,stroke=0)
            self.c.setFillColor(WHITE);self.c.setFont('BookSansBold',9)
            self.c.drawCentredString(x+12,top-16,str(i+1))
            b=self.p(e['title'],x+29,top,235,size=10.2,lead=13.7,font='BookSerifBold',color=NAVY)
            self.label(e.get('theme',''),x+29,b-13,7.5,BURGUNDY)
            self.p(e.get('question',''),x+29,b-24,232,size=8.7,lead=12,bottom=top-125)
            self.c.setStrokeColor(LINE);self.c.line(x,top-132,x+257,top-132)
        self.footer();self.next()
    def produce(self):
        self.cover();self.index()
        for i,e in enumerate(self.stages,1):
            self.opening(i,e);self.continuation(i,e);self.exercise(i,e)
        self.ending();self.c.save()
        if self.errors:raise RuntimeError('Impaginazione: '+'; '.join(self.errors))
        print(f'Libro completo: {self.page} pagine, 8 capitoli')

def main():
    root=Path(__file__).resolve().parents[1]
    data=json.loads((root/'data'/'iliade-otto-tappe.json').read_text(encoding='utf8'))
    if len(data['events'])!=8:raise RuntimeError('Attese otto tappe')
    out=root/'fatto'/'iliade-libro-illustrato.pdf'
    Book(out,root,data['events']).produce()

if __name__=='__main__':main()
