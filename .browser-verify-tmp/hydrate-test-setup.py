from pathlib import Path
p=Path('src/components/AIchat/skinGuideData.js')
s=p.read_text(encoding='utf-8')
start=s.index('const tremellaAmpoule = ')
end=s.index('export const skinTypes',start)
block=s[start:end].splitlines()
block=[line[6:] if line.startswith('      ') else line for line in block]
s=s[:start]+'\n'.join(block)+'\n'+s[end:]
p.write_text(s,encoding='utf-8')
s=Path('.browser-verify-tmp/calm-check.cjs').read_text(encoding='utf-8')
s=s.replace("[['저자극·진정','oily'],['주름·탄력','combination'],['저자극·진정','oily']]", "[['수분·보습','dry'],['주름·탄력','combination'],['저자극·진정','oily'],['수분·보습','dry']]")
s=s.replace("id==='oily'?'예민해진':'주름과 탄력'", "id==='oily'?'예민해진':id==='dry'?'수분이 부족한':'주름과 탄력'")
s=s.replace("['수분·보습','모공·피지','피부톤·기미·잡티']", "['모공·피지','피부톤·기미·잡티']")
s=s.replace('calm-results.json','hydrate-results.json').replace('3 calm steps','3 hydration steps')
Path('.browser-verify-tmp/hydrate-check.cjs').write_text(s,encoding='utf-8')
