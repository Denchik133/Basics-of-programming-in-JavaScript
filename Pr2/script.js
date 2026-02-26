const $ = id => document.getElementById(id);

function isValidDate(dateString){
  const d=new Date(dateString);
  return !isNaN(d.getTime());
}

// Day of Week
function getDayOfWeek(dateString){
  const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return days[new Date(dateString).getDay()];
}
function handleDay(){
  const val=$('dateInput').value.trim();
  if(!isValidDate(val)){
    $('dayResult').textContent="Invalid date";
    return;
  }
  $('dayResult').textContent=getDayOfWeek(val);
}

// Age Calculator
function calculateAge(birthString){
  const birth=new Date(birthString);
  const today=new Date();
  let years=today.getFullYear()-birth.getFullYear();
  let months=today.getMonth()-birth.getMonth();
  let days=today.getDate()-birth.getDate();
  if(days<0){
    months--;
    const prevMonth=new Date(today.getFullYear(),today.getMonth(),0);
    days+=prevMonth.getDate();
  }
  if(months<0){
    years--;
    months+=12;
  }
  return {years,months,days};
}
function handleAge(){
  const val=$('birthInput').value.trim();
  if(!isValidDate(val)){
    $('ageResult').textContent="Invalid date";
    return;
  }
  const age=calculateAge(val);
  $('ageResult').textContent=
    `${age.years} years ${age.months} months ${age.days} days`;
}

// Meeting Validator
function meetingValidator(r1,r2){
  const toMin=(t)=>{
    const parts=t.split(":");
    if(parts.length!==2) {
        return NaN;
    }
    const h=parseInt(parts[0]);
    const m=parseInt(parts[1]);
    if(isNaN(h)||isNaN(m)) {
        return NaN;
    }
    return h*60+m;
  }
  const s1=toMin(r1[0]);
  const e1=toMin(r1[1]);
  const s2=toMin(r2[0]);
  const e2=toMin(r2[1]);
  if([s1,e1,s2,e2].some(isNaN)) {
    return "Invalid time";
  }
  return e1<=s2 || e2<=s1;
}
function handleMeeting(){
  const r1=[$('m1start').value.trim(),$('m1end').value.trim()];
  const r2=[$('m2start').value.trim(),$('m2end').value.trim()];
  $('meetingResult').textContent=meetingValidator(r1,r2);
}

// Days Until Event
function daysUntilEvent(target){
  if(!isValidDate(target)) {
    return "Invalid date";
  }
  const today=new Date();
  const t=new Date(target);
  const diff=t-today;
  return Math.floor(diff/(1000*60*60*24));
}
function handleDays(){
  const val=$('eventDate').value.trim();
  $('daysResult').textContent=daysUntilEvent(val);
}

// Time Zone Converter
function convertTimeZone(time,src,tgt){
  const zones={
    UTC:0,
    EET:2,
    CET:1,
    EST:-5,
    PST:-8
  };
  src=src.trim().toUpperCase();
  tgt=tgt.trim().toUpperCase();
  if(!(src in zones) || !(tgt in zones)) {
    return "Invalid zone";
  }
  const parts=time.split(":");
  if(parts.length!==2) {
    return "Invalid time";
  }
  const h=parseInt(parts[0]);
  const m=parseInt(parts[1]);
  if(isNaN(h)||isNaN(m)) {
    return "Invalid time";
  }
  let total=h*60+m;
  total+=(zones[tgt]-zones[src])*60;
  total=(total+1440)%1440;
  const hh=Math.floor(total/60).toString().padStart(2,'0');
  const mm=(total%60).toString().padStart(2,'0');
  return `${hh}:${mm}`;
}
function handleZone(){
  const time=$('timeValue').value.trim();
  const src=$('sourceZone').value;
  const tgt=$('targetZone').value;
  $('zoneResult').textContent=convertTimeZone(time,src,tgt);
}


// TESTS
console.log("=== TESTS ===");

console.log(getDayOfWeek("2025-03-20")==="Thursday");

console.log(meetingValidator(["09:00","11:00"],["10:00","12:00"])===false);

console.log(daysUntilEvent("2000-01-01")<0);

console.log(convertTimeZone("12:00","UTC","EET")==="14:00");