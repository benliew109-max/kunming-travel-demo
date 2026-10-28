const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
const elements=new Map();function element(key){if(!elements.has(key))elements.set(key,{innerHTML:'',textContent:'',value:'',classList:{add(){},remove(){},toggle(){}},style:{},focus(){},scrollIntoView(){}});return elements.get(key)}
const ctx=vm.createContext({console,structuredClone,localStorage:{getItem(){return null},setItem(){}},document:{querySelector:element,querySelectorAll(){return []},body:{classList:{toggle(){}}},addEventListener(){}},setTimeout(){},clearTimeout(){},requestAnimationFrame(){}});
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],ctx);
vm.runInContext(fs.readFileSync('agent.js','utf8'),ctx);
function run(code){return vm.runInContext(code,ctx)}
assert.equal(run("s.trip.flat().length"),9);
run("view('agent')");assert(element('#content').innerHTML.includes('你的昆明'));
run("askAgent('总结一下当前行程')");assert.equal(run('agentState.messages.length'),2);assert(run('agentState.messages[1].text').includes('云南省博物馆（已锁定）'));
run("agentAction('rain')");assert.equal(run('s.trip[2][0].id'),'village');assert.equal(run('pending.after[0].id'),'ethnicmuseum');run("applyReplan('rain')");assert.equal(run('s.trip[2][0].id'),'ethnicmuseum');assert.equal(run('s.trip[1][0].time'),'10:00');assert(run('s.trip[1][0].locked'));
run('undo()');assert.equal(run('s.trip[2][0].id'),'village');
run("s.day=1;openReplan('tired');applyReplan('tired')");assert.equal(run('s.trip[1][0].time'),'10:00');assert(run('s.trip[1][0].locked'));run('undo()');
assert(run("agentReply('昆明下周天气',false).text").includes('未连接实时天气'));
assert(run("agentReply('识别图片',true).text").includes('无法读取'));
assert(run("agentReply('<script>evil</script>',false).text").includes('<script>'));
run("askAgent('<img src=x onerror=alert(1)>')");assert(!element('#content').innerHTML.includes('<img src=x'));assert(element('#content').innerHTML.includes('&lt;img'));
element('#agentBudget').value='4200';element('#agentWalk').value='5500';element('#agentPace').value='轻松慢游';element('#agentNote').value='清淡';run('saveAgentPreferences()');assert.equal(run('s.budget'),4200);assert.equal(run('s.walk'),5500);assert.equal(run('agentState.preferences.note'),'清淡');
run("view('plan')");assert(element('#content').innerHTML.includes('每天都有自己的节奏'));assert.equal(run('s.trip.flat().length'),9);
assert(!run('JSON.stringify(s)').includes('西安'));
assert.equal(run("agentReply('昆明有哪些适合一家人轻松游玩的地方？',false).text").includes('昆明示例按三个片区安排'),true);
console.log('PASS: 新 Tab、对话、内容转义、天气/图片边界、雨天重排确认、锁定预约、撤销、偏好同步和原行程渲染。');
