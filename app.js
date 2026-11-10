'use strict';
const scenarios={
base:{label:'BASE CASE',title:'수출은 견조하게,\n시장은 선별적으로.',condition:'수출 호조가 이어지지만 금리 부담이 남는 경우',kospi:'수출주 중심의 실적 차별화',kospiCheck:'반도체·전력기기 이익 전망을 확인합니다.',kosdaq:'현금흐름이 확인되는 성장주에 주목',kosdaqCheck:'매출 전환과 자금 조달 조건을 확인합니다.'},
up:{label:'UPSIDE CASE',title:'이익의 성장이,\n시장의 확산으로.',condition:'이익 전망 상향 · 환율과 금리 안정 · 매수 지속',kospi:'대형 수출주에서 다른 업종으로 상승 확산 가능',kospiCheck:'외국인 누적 순매수와 상승 업종 확대를 확인합니다.',kosdaq:'실적 있는 성장주에서 상승 확산 가능',kosdaqCheck:'거래대금 증가와 실적 상향이 동반되는지 확인합니다.'},
down:{label:'DOWNSIDE CASE',title:'기대가 낮아지면,\n현금을 확인할 때.',condition:'이익 전망 하향 · 유가와 환율 급등 · 자금 유출',kospi:'주요 대형주의 이익 하향이 지수에 부담',kospiCheck:'반도체 전망 변화와 외국인 매도 지속을 확인합니다.',kosdaq:'자금 조달 의존 기업의 부담 확대',kosdaqCheck:'현금 소진 속도·차환·주식 희석 위험을 확인합니다.'}
};
const scenarioButtons=document.querySelectorAll('[data-scenario]');
function selectScenario(key){const data=scenarios[key];if(!data)return;const fields={label:'scenario-label',title:'scenario-title',condition:'scenario-condition',kospi:'scenario-kospi',kospiCheck:'scenario-kospi-check',kosdaq:'scenario-kosdaq',kosdaqCheck:'scenario-kosdaq-check'};Object.entries(fields).forEach(([field,id])=>{document.getElementById(id).textContent=data[field]});document.getElementById('scenario-title').style.whiteSpace='pre-line';scenarioButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.scenario===key)));}
scenarioButtons.forEach(button=>button.addEventListener('click',()=>selectScenario(button.dataset.scenario)));
const storageKey='market-compass-checks-v1';
const checks=[...document.querySelectorAll('.checklist input')];
function updateChecks(save){const selected=checks.filter(check=>check.checked).map(check=>check.value);document.getElementById('check-count').textContent=`${selected.length} / ${checks.length} 확인`;document.getElementById('check-progress').style.width=`${selected.length/checks.length*100}%`;if(save){try{localStorage.setItem(storageKey,JSON.stringify(selected))}catch{document.getElementById('storage-note').textContent='브라우저 저장을 사용할 수 없어 현재 화면에서만 체크 상태가 유지됩니다. 체크 수는 투자 점수가 아닙니다.'}}}
try{const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(saved))checks.forEach(check=>{check.checked=saved.includes(check.value)})}catch{document.getElementById('storage-note').textContent='저장된 체크 상태를 읽을 수 없습니다. 현재 화면에서는 정상적으로 사용할 수 있습니다.'}
checks.forEach(check=>check.addEventListener('change',()=>updateChecks(true)));
document.getElementById('reset-checks').addEventListener('click',()=>{checks.forEach(check=>{check.checked=false});updateChecks(true)});
updateChecks(false);
