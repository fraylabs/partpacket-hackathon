import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch();
const results=[];
for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844],['small-mobile',320,568]]){
 const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.screenshot({path:`evidence/${name}.png`,fullPage:true});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 await page.locator('header [data-open]').click();
 await page.getByRole('button',{name:'Review the example'}).click();
 await page.getByRole('button',{name:'Explore the handoff',exact:false}).last().click();
 if(await page.locator('dialog').evaluate(el=>el.scrollTop)!==0)throw Error('Step did not reset dialog scroll');
 if(!await page.getByText('This example ends here.',{exact:false}).isVisible())throw Error('Missing concept endpoint');
 await page.screenshot({path:`evidence/${name}-example.png`});
 const dialogAxe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 await page.getByRole('button',{name:'Back',exact:true}).click();
 await page.getByRole('button',{name:'Back',exact:true}).click();
 await page.keyboard.press('Escape');
 if(await page.locator('dialog').isVisible())throw Error('Escape did not close');
 results.push({viewport:name,overflow,errors,accessibilityViolations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),dialogViolations:dialogAxe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),journey:'ask, approve, make, back twice, Escape passed'});
 await context.close();
}
await browser.close();await writeFile('evidence/browser-qa.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
if(results.some(r=>r.overflow||r.errors.length||r.accessibilityViolations.length||r.dialogViolations.length))process.exitCode=1;
