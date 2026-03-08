import { useState, useEffect, useRef, useCallback } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from "recharts";

const dark = {
  bg:"#060C1A",surface:"#0F1729",card:"#131E35",border:"rgba(255,255,255,0.07)",
  text:"#E2E8F0",textSec:"#94A3B8",textMuted:"#475569",
  accent:"#22D3EE",purple:"#A78BFA",green:"#34D399",red:"#F87171",yellow:"#FBBF24",
  inputBg:"rgba(255,255,255,0.05)",navBg:"rgba(6,12,26,0.97)",modalBg:"#0F1729",
};
const light = {
  bg:"#EEF2FF",surface:"#FFFFFF",card:"#FFFFFF",border:"rgba(0,0,0,0.08)",
  text:"#1E293B",textSec:"#475569",textMuted:"#94A3B8",
  accent:"#0284C7",purple:"#7C3AED",green:"#059669",red:"#DC2626",yellow:"#D97706",
  inputBg:"#F1F5F9",navBg:"#FFFFFF",modalBg:"#FFFFFF",
};

const T = {
  en:{
    appName:"Financial Guardian",tagline:"AI-Powered Security",
    welcomeBack:"Welcome Back",createAccount:"Create Account",
    login:"Log In",signup:"Sign Up",email:"Email Address",password:"Password",
    confirmPassword:"Confirm Password",fullName:"Full Name",phone:"Phone Number",
    continueGoogle:"Continue with Google",orWith:"or continue with",
    noAccount:"Don't have an account?",alreadyHave:"Already have an account?",
    addBankAcc:"Add Bank Account",bankName:"Bank Name",accountNumber:"Account Number",
    ifscCode:"IFSC Code",accountHolder:"Account Holder Name",accountType:"Account Type",
    savings:"Savings",current:"Current",skipForNow:"Skip for now",addAccount:"Add Account",
    dashboard:"Dashboard",transactions:"Transactions",fraud:"Alerts",
    health:"Health",assistant:"AI Chat",profile:"Profile",debts:"Debts",
    totalBalance:"Total Balance",monthlySpend:"Monthly Spend",
    fraudBlocked:"Fraud Blocked",healthScore:"Health Score",
    recentTx:"Recent Transactions",spendByCat:"Spending by Category",
    monthlyTrend:"Monthly Trend",viewAll:"View All →",
    addTx:"+ Add Transaction",allTx:"All Transactions",
    safe:"Safe",suspicious:"Suspicious",blocked:"Blocked",
    riskScore:"Risk",category:"Category",noTx:"No transactions yet. Add one!",
    fraudTitle:"Fraud Detection",activeAlerts:"Active Alerts",
    highRisk:"🔴 HIGH RISK",mediumRisk:"🟡 MEDIUM RISK",lowRisk:"🟢 LOW RISK",
    resolve:"Resolve",dismiss:"Dismiss",resolved:"✅ Resolved",
    noAlerts:"No active alerts. You're safe! 🛡️",
    financialHealth:"Financial Health",healthBreakdown:"Score Breakdown",
    savingsRatio:"Savings Ratio",expenseBehavior:"Expense Behavior",
    riskFreq:"Risk Frequency",debtLvl:"Debt Level",
    excellent:"Excellent",good:"Good",fair:"Fair",poor:"Poor",
    tips:"Smart Tips",
    aiAssistant:"AI Financial Assistant",online:"Online",
    askPlaceholder:"Ask me anything about your finances...",
    thinking:"Analyzing...",send:"Send",
    voiceInput:"Voice",listening:"Listening...",stopListening:"Stop",
    speaking:"Speaking...",stopSpeaking:"Stop",
    myProfile:"My Profile",settings:"Settings",darkMode:"Dark Mode",
    language:"Language",notifications:"Notifications",logout:"Log Out",
    editProfile:"Edit Profile",saveProfile:"Save Profile",
    memberSince:"Member since",totalSaved:"Total Saved",
    txCount:"Transactions",cancel:"Cancel",update:"Update",
    updateBalance:"Update Balance",enterBalance:"Enter new balance (₹)",
    txName:"Transaction Name",amount:"Amount (₹)",merchant:"Merchant",
    txType:"Type",debit:"Debit",credit:"Credit",save:"Save",
    tip1:"💡 Reduce dining expenses by 20% to boost your score.",
    tip2:"📈 Set up auto-savings of ₹5,000/month.",
    tip3:"🛡️ Enable 2-factor auth for all transactions.",
    income:"Income",expenses:"Expenses",
    linkedBanks:"Linked Bank Accounts",noBank:"No bank accounts linked.",
    addDebt:"+ Add Debt",debtName:"Debt Name",debtAmount:"Total Amount (₹)",
    debtPaid:"Amount Paid (₹)",dueDate:"Due Date",debtType:"Debt Type",
    debtTypes:["Personal Loan","Home Loan","Car Loan","Credit Card","Education Loan","Other"],
    debtTitle:"Debt Tracker",totalDebt:"Total Debt",debtPaidAmt:"Total Paid",
    remaining:"Remaining",overdue:"OVERDUE",dueToday:"DUE TODAY",dueSoon:"DUE SOON",
    noDebts:"No debts tracked. Stay debt-free! 🎉",markPaid:"Mark Payment",
    debtReminder:"Debt Reminder",
    suggested:["Is my recent transaction safe?","How much did I spend this month?","How to improve my health score?","Show my top spending categories","Any high risk transactions?"],
    greeting:"Hello! I'm your AI Financial Guardian. Ask me anything about your finances — transactions, fraud risks, or spending habits. You can also use the 🎙️ voice button to talk to me!",
    categories:["Food","Shopping","Utilities","Entertainment","Transport","Health","Income","Other"],
    step1:"Account Details",step2:"Bank Account",
    voiceNotSupported:"Voice not supported in this browser. Try Chrome.",
  },
  hi:{
    appName:"वित्तीय रक्षक",tagline:"AI-संचालित सुरक्षा",
    welcomeBack:"वापस स्वागत है",createAccount:"खाता बनाएं",
    login:"लॉग इन",signup:"साइन अप",email:"ईमेल पता",password:"पासवर्ड",
    confirmPassword:"पासवर्ड पुष्टि करें",fullName:"पूरा नाम",phone:"फोन नंबर",
    continueGoogle:"Google से जारी रखें",orWith:"या जारी रखें",
    noAccount:"खाता नहीं है?",alreadyHave:"पहले से खाता है?",
    addBankAcc:"बैंक खाता जोड़ें",bankName:"बैंक का नाम",accountNumber:"खाता नंबर",
    ifscCode:"IFSC कोड",accountHolder:"खाताधारक का नाम",accountType:"खाता प्रकार",
    savings:"बचत",current:"चालू",skipForNow:"अभी छोड़ें",addAccount:"खाता जोड़ें",
    dashboard:"डैशबोर्ड",transactions:"लेनदेन",fraud:"अलर्ट",
    health:"स्वास्थ्य",assistant:"AI चैट",profile:"प्रोफ़ाइल",debts:"ऋण",
    totalBalance:"कुल बैलेंस",monthlySpend:"मासिक खर्च",
    fraudBlocked:"धोखाधड़ी रोकी",healthScore:"स्वास्थ्य स्कोर",
    recentTx:"हाल के लेनदेन",spendByCat:"श्रेणी के अनुसार खर्च",
    monthlyTrend:"मासिक प्रवृत्ति",viewAll:"सभी देखें →",
    addTx:"+ लेनदेन जोड़ें",allTx:"सभी लेनदेन",
    safe:"सुरक्षित",suspicious:"संदिग्ध",blocked:"अवरुद्ध",
    riskScore:"जोखिम",category:"श्रेणी",noTx:"अभी कोई लेनदेन नहीं।",
    fraudTitle:"धोखाधड़ी पहचान",activeAlerts:"सक्रिय अलर्ट",
    highRisk:"🔴 उच्च जोखिम",mediumRisk:"🟡 मध्यम जोखिम",lowRisk:"🟢 निम्न जोखिम",
    resolve:"हल करें",dismiss:"अनदेखा करें",resolved:"✅ हल किया",
    noAlerts:"कोई सक्रिय अलर्ट नहीं। आप सुरक्षित हैं! 🛡️",
    financialHealth:"वित्तीय स्वास्थ्य",healthBreakdown:"स्कोर विवरण",
    savingsRatio:"बचत अनुपात",expenseBehavior:"खर्च व्यवहार",
    riskFreq:"जोखिम आवृत्ति",debtLvl:"ऋण स्तर",
    excellent:"उत्कृष्ट",good:"अच्छा",fair:"ठीक",poor:"खराब",
    tips:"स्मार्ट सुझाव",
    aiAssistant:"AI वित्तीय सहायक",online:"ऑनलाइन",
    askPlaceholder:"अपने वित्त के बारे में कुछ भी पूछें...",
    thinking:"विश्लेषण...",send:"भेजें",
    voiceInput:"वॉयस",listening:"सुन रहा है...",stopListening:"रोकें",
    speaking:"बोल रहा है...",stopSpeaking:"रोकें",
    myProfile:"मेरी प्रोफ़ाइल",settings:"सेटिंग्स",darkMode:"डार्क मोड",
    language:"भाषा",notifications:"सूचनाएं",logout:"लॉग आउट",
    editProfile:"प्रोफ़ाइल संपादित करें",saveProfile:"प्रोफ़ाइल सहेजें",
    memberSince:"सदस्य बने",totalSaved:"कुल बचत",
    txCount:"लेनदेन",cancel:"रद्द करें",update:"अपडेट करें",
    updateBalance:"बैलेंस अपडेट",enterBalance:"नई बैलेंस दर्ज करें (₹)",
    txName:"लेनदेन का नाम",amount:"राशि (₹)",merchant:"व्यापारी",
    txType:"प्रकार",debit:"नामे",credit:"जमा",save:"सहेजें",
    tip1:"💡 स्कोर बढ़ाने के लिए खाने का खर्च 20% कम करें।",
    tip2:"📈 हर महीने ₹5,000 की ऑटो-बचत सेट करें।",
    tip3:"🛡️ सभी लेनदेन के लिए 2-फैक्टर प्रमाणीकरण चालू करें।",
    income:"आय",expenses:"खर्च",
    linkedBanks:"लिंक्ड बैंक खाते",noBank:"कोई बैंक खाता नहीं।",
    addDebt:"+ ऋण जोड़ें",debtName:"ऋण का नाम",debtAmount:"कुल राशि (₹)",
    debtPaid:"भुगतान की गई राशि (₹)",dueDate:"देय तिथि",debtType:"ऋण प्रकार",
    debtTypes:["व्यक्तिगत ऋण","होम लोन","कार लोन","क्रेडिट कार्ड","शिक्षा ऋण","अन्य"],
    debtTitle:"ऋण ट्रैकर",totalDebt:"कुल ऋण",debtPaidAmt:"कुल भुगतान",
    remaining:"शेष",overdue:"अतिदेय",dueToday:"आज देय",dueSoon:"जल्द देय",
    noDebts:"कोई ऋण नहीं। ऋण मुक्त रहें! 🎉",markPaid:"भुगतान करें",
    debtReminder:"ऋण अनुस्मारक",
    suggested:["क्या मेरी हालिया ट्रांजेक्शन सुरक्षित है?","इस महीने मैंने कितना खर्च किया?","मेरा स्वास्थ्य स्कोर कैसे सुधारें?","मेरी शीर्ष खर्च श्रेणियां दिखाएं","कोई उच्च जोखिम लेनदेन?"],
    greeting:"नमस्ते! मैं आपका AI वित्तीय रक्षक हूं। मुझसे अपने वित्त के बारे में कुछ भी पूछें। 🎙️ वॉयस बटन से भी बात कर सकते हैं!",
    categories:["भोजन","खरीदारी","उपयोगिताएं","मनोरंजन","परिवहन","स्वास्थ्य","आय","अन्य"],
    step1:"खाता विवरण",step2:"बैंक खाता",
    voiceNotSupported:"इस ब्राउज़र में वॉयस समर्थित नहीं। Chrome आज़माएं।",
  }
};

const CAT_COLORS={Food:"#22D3EE",Shopping:"#A78BFA",Utilities:"#34D399",Entertainment:"#FB923C",Transport:"#F472B6",Health:"#FBBF24",Income:"#4ADE80",Other:"#94A3B8"};
const CAT_ICONS={Food:"🍔",Shopping:"🛒",Utilities:"⚡",Entertainment:"📺",Transport:"🚗",Health:"💊",Income:"💰",Other:"💳"};
const CATS=["Food","Shopping","Utilities","Entertainment","Transport","Health","Income","Other"];
const BANK_LOGOS={SBI:"🏦",HDFC:"🔵",ICICI:"🟠",Axis:"🟣",Kotak:"🔴",Other:"🏛️"};

const INIT_TX=[
  {id:"1",name:"Amazon Shopping",amount:-3499,category:"Shopping",risk:12,status:"safe",time:"2 min ago",merchant:"Amazon.in"},
  {id:"2",name:"Unknown Transfer",amount:-45000,category:"Other",risk:92,status:"blocked",time:"15 min ago",merchant:"Unknown"},
  {id:"3",name:"Swiggy Order",amount:-650,category:"Food",risk:5,status:"safe",time:"1 hr ago",merchant:"Swiggy"},
  {id:"4",name:"ATM Withdrawal",amount:-10000,category:"Other",risk:67,status:"suspicious",time:"2 hr ago",merchant:"SBI ATM"},
  {id:"5",name:"Salary Credit",amount:85000,category:"Income",risk:2,status:"safe",time:"Yesterday",merchant:"TCS Ltd."},
  {id:"6",name:"Netflix",amount:-649,category:"Entertainment",risk:8,status:"safe",time:"Yesterday",merchant:"Netflix"},
  {id:"7",name:"Electricity Bill",amount:-2100,category:"Utilities",risk:3,status:"safe",time:"3 days ago",merchant:"MSEDCL"},
  {id:"8",name:"Ola Ride",amount:-320,category:"Transport",risk:4,status:"safe",time:"4 days ago",merchant:"Ola"},
];
const INIT_ALERTS=[
  {id:"1",title:"Unusual Large Transfer",desc:"₹45,000 transfer to unknown account",risk:"high",time:"15 min ago",amount:45000,resolved:false},
  {id:"2",title:"Duplicate Transaction",desc:"Same merchant charged twice in 2 minutes",risk:"high",time:"2 days ago",amount:2999,resolved:false},
  {id:"3",title:"Suspicious ATM Activity",desc:"ATM withdrawal at 2:34 AM",risk:"medium",time:"2 hr ago",amount:10000,resolved:false},
  {id:"4",title:"New Device Login",desc:"Account accessed from unrecognized device",risk:"medium",time:"5 hr ago",amount:0,resolved:true},
];
const MONTHLY=[
  {month:"Aug",spend:42000,income:85000,fraud:2},{month:"Sep",spend:38000,income:85000,fraud:0},
  {month:"Oct",spend:55000,income:85000,fraud:5},{month:"Nov",spend:47000,income:85000,fraud:1},
  {month:"Dec",spend:68000,income:85000,fraud:3},{month:"Jan",spend:51000,income:85000,fraud:7},
];

function useVoice(lang){
  const [isListening,setIsListening]=useState(false);
  const [isSpeaking,setIsSpeaking]=useState(false);
  const recRef=useRef(null);
  const startListening=useCallback((onResult)=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR) return false;
    const r=new SR();
    r.lang=lang==="hi"?"hi-IN":"en-IN";
    r.interimResults=false;
    r.onresult=(e)=>{onResult(e.results[0][0].transcript);setIsListening(false);};
    r.onerror=()=>setIsListening(false);
    r.onend=()=>setIsListening(false);
    recRef.current=r; r.start(); setIsListening(true); return true;
  },[lang]);
  const stopListening=useCallback(()=>{recRef.current?.stop();setIsListening(false);},[]);
  const speak=useCallback((text)=>{
    window.speechSynthesis?.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang=lang==="hi"?"hi-IN":"en-IN"; u.rate=0.9;
    u.onstart=()=>setIsSpeaking(true);
    u.onend=()=>setIsSpeaking(false);
    u.onerror=()=>setIsSpeaking(false);
    window.speechSynthesis?.speak(u);
  },[lang]);
  const stopSpeaking=useCallback(()=>{window.speechSynthesis?.cancel();setIsSpeaking(false);},[]);
  return{isListening,isSpeaking,startListening,stopListening,speak,stopSpeaking};
}

export default function App(){
  const [isDark,setIsDark]=useState(true);
  const [lang,setLang]=useState("en");
  const [user,setUser]=useState(null);
  const [authStep,setAuthStep]=useState(1);
  const [authMode,setAuthMode]=useState("login");
  const [authForm,setAuthForm]=useState({fullName:"",email:"",password:"",confirmPassword:"",phone:""});
  const [bankForm,setBankForm]=useState({bankName:"HDFC",accountHolder:"",accountNumber:"",ifscCode:"",accountType:"savings"});
  const [tab,setTab]=useState("dashboard");
  const [balance,setBalance]=useState(124350);
  const [txs,setTxs]=useState(INIT_TX);
  const [alerts,setAlerts]=useState(INIT_ALERTS);
  const [debts,setDebts]=useState([
    {id:"d1",name:"Home Loan EMI",type:"Home Loan",total:2400000,paid:480000,dueDate:"2026-03-05",color:"#F87171"},
    {id:"d2",name:"Car Loan",type:"Car Loan",total:450000,paid:180000,dueDate:"2026-03-15",color:"#FBBF24"},
    {id:"d3",name:"Credit Card Bill",type:"Credit Card",total:35000,paid:10000,dueDate:"2026-02-28",color:"#A78BFA"},
  ]);
  const [messages,setMessages]=useState([]);
  const [chatInput,setChatInput]=useState("");
  const [thinking,setThinking]=useState(false);
  const [balModal,setBalModal]=useState(false);
  const [newBal,setNewBal]=useState("");
  const [txModal,setTxModal]=useState(false);
  const [txForm,setTxForm]=useState({name:"",amount:"",category:"Food",type:"debit",merchant:""});
  const [txFilter,setTxFilter]=useState("all");
  const [editModal,setEditModal]=useState(false);
  const [editForm,setEditForm]=useState({});
  const [debtModal,setDebtModal]=useState(false);
  const [debtForm,setDebtForm]=useState({name:"",type:"Personal Loan",total:"",paid:"",dueDate:""});
  const [bankModal,setBankModal]=useState(false);
  const [addBankForm,setAddBankForm]=useState({bankName:"HDFC",accountHolder:"",accountNumber:"",ifscCode:"",accountType:"savings"});
  const [notifOn,setNotifOn]=useState(true);
  const chatRef=useRef(null);
  const theme=isDark?dark:light;
  const t=T[lang];
  const voice=useVoice(lang);

  useEffect(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;},[messages]);
  useEffect(()=>{if(tab==="assistant"&&messages.length===0)setMessages([{role:"assistant",text:t.greeting,id:Date.now()}]);},[tab]);

  const monthlySpend=txs.filter(tx=>tx.amount<0).reduce((s,tx)=>s+Math.abs(tx.amount),0);
  const fraudBlocked=alerts.filter(a=>a.risk==="high"&&a.amount>0).reduce((s,a)=>s+a.amount,0);
  const unresolvedCount=alerts.filter(a=>!a.resolved).length;
  const totalDebt=debts.reduce((s,d)=>s+(d.total-d.paid),0);
  const overdueDebts=debts.filter(d=>new Date(d.dueDate)<new Date()&&(d.total-d.paid)>0);
  const healthScore=Math.min(100,Math.max(0,Math.round(
    (balance>50000?25:balance>20000?15:5)+(monthlySpend<50000?20:12)+(unresolvedCount===0?20:8)+(totalDebt<100000?15:totalDebt<500000?8:2)+15
  )));
  const healthColor=healthScore>=80?theme.green:healthScore>=60?theme.yellow:theme.red;
  const catSpend={};
  txs.filter(tx=>tx.amount<0).forEach(tx=>{catSpend[tx.category]=(catSpend[tx.category]||0)+Math.abs(tx.amount);});
  const catData=Object.entries(catSpend).filter(([k])=>k!=="Income").map(([name,value])=>({name,value,color:CAT_COLORS[name]||"#94A3B8"})).sort((a,b)=>b.value-a.value).slice(0,5);
  const initials=(user?.fullName||"U").split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2);
  const hour=new Date().getHours();
  const grt=lang==="en"?(hour<12?"Good Morning":hour<17?"Good Afternoon":"Good Evening"):(hour<12?"शुभ प्रभात":hour<17?"शुभ अपराह्न":"शुभ संध्या");
  const filteredTxs=txs.filter(tx=>txFilter==="all"?true:txFilter==="safe"?tx.status==="safe":tx.status!=="safe");
  const maskAcc=(n)=>n?`•••• •••• ${n.slice(-4)}`:"•••• ••••";

  const sendChat=async(text)=>{
    if(!text.trim()||thinking)return;
    const um={role:"user",text,id:Date.now()};
    const nm=[...messages,um];
    setMessages(nm);setChatInput("");setThinking(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:`You are an AI Financial Guardian for an Indian user. Be concise (2-4 sentences), warm, practical.
User: Balance ₹${balance.toLocaleString("en-IN")}, Monthly Spend ₹${monthlySpend.toLocaleString("en-IN")}, Health ${healthScore}/100, Alerts ${unresolvedCount}, Total Debt ₹${totalDebt.toLocaleString("en-IN")}, Overdue Debts: ${overdueDebts.length}, Banks linked: ${user?.banks?.length||0}.
Language: ${lang==="hi"?"Respond in Hindi (Devanagari script). Keep all numbers in English numerals.":"Respond in English."}
Start with a relevant emoji.`,
          messages:nm.map(m=>({role:m.role,content:m.text}))
        })
      });
      const data=await res.json();
      const reply=data.content?.[0]?.text||"Sorry, try again.";
      setMessages(p=>[...p,{role:"assistant",text:reply,id:Date.now()}]);
      voice.speak(reply);
    }catch{
      setMessages(p=>[...p,{role:"assistant",text:"⚠️ Connection error. Please try again.",id:Date.now()}]);
    }
    setThinking(false);
  };

  const handleVoice=()=>{
    if(voice.isListening){voice.stopListening();return;}
    const ok=voice.startListening((tr)=>{setChatInput(tr);setTimeout(()=>sendChat(tr),100);});
    if(!ok)alert(t.voiceNotSupported);
  };

  const addTx=()=>{
    const amt=parseFloat(txForm.amount);
    if(!txForm.name||!amt||amt<=0)return;
    const risk=amt>20000?Math.floor(Math.random()*30+60):amt>5000?Math.floor(Math.random()*30+20):Math.floor(Math.random()*20);
    const newTx={id:Date.now().toString(),name:txForm.name,amount:txForm.type==="debit"?-amt:amt,category:txForm.category,risk,status:risk>70?"suspicious":"safe",time:"Just now",merchant:txForm.merchant||txForm.name};
    setTxs([newTx,...txs]);setBalance(b=>b+newTx.amount);
    if(risk>70)setAlerts(a=>[{id:Date.now()+"a",title:"Suspicious Transaction",desc:`${txForm.name} flagged as high risk`,risk:risk>80?"high":"medium",time:"Just now",amount:amt,resolved:false},...a]);
    setTxForm({name:"",amount:"",category:"Food",type:"debit",merchant:""});setTxModal(false);
  };

  const addDebt=()=>{
    const total=parseFloat(debtForm.total),paid=parseFloat(debtForm.paid)||0;
    if(!debtForm.name||!total||total<=0||!debtForm.dueDate)return;
    const cols=["#F87171","#FBBF24","#A78BFA","#22D3EE","#34D399","#FB923C"];
    setDebts(p=>[...p,{id:Date.now().toString(),name:debtForm.name,type:debtForm.type,total,paid,dueDate:debtForm.dueDate,color:cols[Math.floor(Math.random()*cols.length)]}]);
    setDebtForm({name:"",type:"Personal Loan",total:"",paid:"",dueDate:""});setDebtModal(false);
  };

  // ── AUTH ───────────────────────────────────────────────────
  if(!user){
    const doGoogle=()=>setUser({fullName:"Demo User",email:"demo@gmail.com",phone:"+91 98765 43210",joinDate:"Feb 2026",authMethod:"google",banks:[]});
    const doCreds=()=>{
      if(authMode==="login"&&authForm.email&&authForm.password.length>=6){setUser({fullName:"User",email:authForm.email,phone:"",joinDate:"Feb 2026",authMethod:"email",banks:[]});return;}
      if(authMode==="signup"&&authForm.fullName&&authForm.email&&authForm.password.length>=6&&authForm.password===authForm.confirmPassword){setAuthStep(2);return;}
    };
    const doBank=(skip)=>{
      const banks=skip?[]:(bankForm.accountNumber&&bankForm.accountHolder&&bankForm.ifscCode?[{...bankForm,id:Date.now().toString()}]:[]);
      setUser({fullName:authForm.fullName,email:authForm.email,phone:authForm.phone,joinDate:"Feb 2026",authMethod:"email",banks});
    };

    return(
      <div style={{background:theme.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input{outline:none;font-family:inherit;}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
        <div style={{width:"100%",maxWidth:420,padding:24,animation:"fadeIn 0.4s ease"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:52,marginBottom:10}}>🛡️</div>
            <div style={{fontSize:26,fontWeight:800,color:theme.text}}>{t.appName}</div>
            <div style={{fontSize:12,color:theme.accent,fontWeight:600,marginTop:4,letterSpacing:0.5}}>{t.tagline}</div>
          </div>

          {authMode==="signup"&&(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:20}}>
              {[t.step1,t.step2].map((s,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:26,height:26,borderRadius:13,background:authStep>i?theme.accent:authStep===i+1?theme.accent+"30":theme.inputBg,border:`2px solid ${authStep>=i+1?theme.accent:theme.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:authStep>i?"#fff":authStep===i+1?theme.accent:theme.textMuted,transition:"all 0.3s"}}>
                    {authStep>i+1?"✓":i+1}
                  </div>
                  <span style={{fontSize:11,fontWeight:600,color:authStep===i+1?theme.accent:theme.textMuted}}>{s}</span>
                  {i===0&&<div style={{width:24,height:1,background:authStep>1?theme.accent:theme.border,transition:"background 0.3s"}}/>}
                </div>
              ))}
            </div>
          )}

          <div style={{background:theme.card,borderRadius:24,padding:26,border:`1px solid ${theme.border}`,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
            {authStep===1&&(
              <>
                <div style={{display:"flex",background:theme.inputBg,borderRadius:12,padding:4,marginBottom:18}}>
                  {["login","signup"].map(m=>(
                    <button key={m} onClick={()=>{setAuthMode(m);setAuthStep(1);}} style={{flex:1,padding:"9px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:authMode===m?theme.accent:"transparent",color:authMode===m?"#fff":theme.textMuted,fontFamily:"inherit",transition:"all 0.2s"}}>
                      {m==="login"?t.login:t.signup}
                    </button>
                  ))}
                </div>
                <div style={{fontSize:18,fontWeight:800,color:theme.text,marginBottom:16}}>{authMode==="login"?t.welcomeBack:t.createAccount}</div>
                <button onClick={doGoogle} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:10,background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:13,padding:13,cursor:"pointer",marginBottom:14,fontFamily:"inherit",color:theme.text,fontSize:14,fontWeight:600}}>
                  <span style={{color:"#4285F4",fontWeight:900,fontSize:15}}>G</span>{t.continueGoogle}
                </button>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                  <div style={{flex:1,height:1,background:theme.border}}/><span style={{fontSize:11,color:theme.textMuted}}>{t.orWith}</span><div style={{flex:1,height:1,background:theme.border}}/>
                </div>
                {authMode==="signup"&&<FI label={t.fullName} v={authForm.fullName} set={v=>setAuthForm(f=>({...f,fullName:v}))} theme={theme}/>}
                <FI label={t.email} v={authForm.email} set={v=>setAuthForm(f=>({...f,email:v}))} theme={theme} tp="email"/>
                {authMode==="signup"&&<FI label={t.phone} v={authForm.phone} set={v=>setAuthForm(f=>({...f,phone:v}))} theme={theme}/>}
                <FI label={t.password} v={authForm.password} set={v=>setAuthForm(f=>({...f,password:v}))} theme={theme} tp="password"/>
                {authMode==="signup"&&<FI label={t.confirmPassword} v={authForm.confirmPassword} set={v=>setAuthForm(f=>({...f,confirmPassword:v}))} theme={theme} tp="password"/>}
                <button onClick={doCreds} style={{width:"100%",background:theme.accent,border:"none",borderRadius:13,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginTop:4}}>
                  {authMode==="login"?t.login:lang==="en"?"Next: Add Bank Account →":t.signup}
                </button>
                <div style={{textAlign:"center",marginTop:14,fontSize:13,color:theme.textMuted}}>
                  {authMode==="login"?t.noAccount:t.alreadyHave}{" "}
                  <span onClick={()=>{setAuthMode(m=>m==="login"?"signup":"login");setAuthStep(1);}} style={{color:theme.accent,fontWeight:700,cursor:"pointer"}}>{authMode==="login"?t.signup:t.login}</span>
                </div>
              </>
            )}

            {authStep===2&&authMode==="signup"&&(
              <>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
                  <button onClick={()=>setAuthStep(1)} style={{background:"none",border:`1px solid ${theme.border}`,borderRadius:10,padding:"5px 11px",cursor:"pointer",color:theme.textSec,fontSize:12,fontFamily:"inherit"}}>← Back</button>
                  <div style={{fontSize:17,fontWeight:800,color:theme.text}}>{t.addBankAcc}</div>
                </div>
                <div style={{background:theme.accent+"10",border:`1px solid ${theme.accent}25`,borderRadius:12,padding:11,marginBottom:16,fontSize:11,color:theme.accent,fontWeight:500,lineHeight:1.6}}>
                  🔒 Your bank details are encrypted and stored securely. We never share them.
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,fontWeight:700,color:theme.textSec,marginBottom:7}}>{t.bankName}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                    {["SBI","HDFC","ICICI","Axis","Kotak","Other"].map(b=>(
                      <button key={b} onClick={()=>setBankForm(f=>({...f,bankName:b}))} style={{padding:"6px 13px",borderRadius:20,border:`1px solid ${bankForm.bankName===b?theme.accent:theme.border}`,background:bankForm.bankName===b?theme.accent+"18":"transparent",color:bankForm.bankName===b?theme.accent:theme.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                        {BANK_LOGOS[b]||"🏦"} {b}
                      </button>
                    ))}
                  </div>
                </div>
                <FI label={t.accountHolder} v={bankForm.accountHolder} set={v=>setBankForm(f=>({...f,accountHolder:v}))} theme={theme}/>
                <FI label={t.accountNumber} v={bankForm.accountNumber} set={v=>setBankForm(f=>({...f,accountNumber:v}))} theme={theme} tp="number"/>
                <FI label={t.ifscCode} v={bankForm.ifscCode} set={v=>setBankForm(f=>({...f,ifscCode:v.toUpperCase()}))} theme={theme}/>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,fontWeight:700,color:theme.textSec,marginBottom:7}}>{t.accountType}</div>
                  <div style={{display:"flex",gap:8}}>
                    {["savings","current"].map(tp=>(
                      <button key={tp} onClick={()=>setBankForm(f=>({...f,accountType:tp}))} style={{flex:1,padding:10,borderRadius:11,border:`1px solid ${bankForm.accountType===tp?theme.accent:theme.border}`,background:bankForm.accountType===tp?theme.accent+"18":"transparent",color:bankForm.accountType===tp?theme.accent:theme.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                        {tp==="savings"?`💰 ${t.savings}`:`🏢 ${t.current}`}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={()=>doBank(false)} style={{width:"100%",background:theme.accent,border:"none",borderRadius:13,padding:14,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:8}}>{t.addAccount}</button>
                <button onClick={()=>doBank(true)} style={{width:"100%",background:"transparent",border:`1px solid ${theme.border}`,borderRadius:13,padding:12,color:theme.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{t.skipForNow}</button>
              </>
            )}
          </div>

          <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:16}}>
            <button onClick={()=>setIsDark(d=>!d)} style={{background:theme.card,border:`1px solid ${theme.border}`,borderRadius:18,padding:"5px 13px",cursor:"pointer",color:theme.textSec,fontSize:12,fontFamily:"inherit"}}>{isDark?"☀️ Light":"🌙 Dark"}</button>
            <button onClick={()=>setLang(l=>l==="en"?"hi":"en")} style={{background:theme.card,border:`1px solid ${theme.border}`,borderRadius:18,padding:"5px 13px",cursor:"pointer",color:theme.textSec,fontSize:12,fontFamily:"inherit"}}>{lang==="en"?"🇮🇳 हिंदी":"🇬🇧 English"}</button>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN APP ──────────────────────────────────────────────────────────────
  const tabs=[["dashboard","📊",t.dashboard],["transactions","💳",t.transactions],["fraud","🚨",t.fraud],["health","❤️",t.health],["debts","💸",t.debts],["assistant","🤖",t.assistant],["profile","👤",t.profile]];

  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",background:theme.bg,minHeight:"100vh",color:theme.text,maxWidth:480,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input,textarea{outline:none;font-family:inherit;}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(128,128,128,0.2);border-radius:4px}@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}@keyframes ripple{0%{transform:scale(1);opacity:0.8}100%{transform:scale(2.2);opacity:0}}`}</style>

      {/* Header */}
      <div style={{position:"sticky",top:0,zIndex:100,background:theme.navBg,borderBottom:`1px solid ${theme.border}`,backdropFilter:"blur(20px)",padding:"10px 15px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <span style={{fontSize:22,filter:`drop-shadow(0 0 8px ${theme.accent})`}}>🛡️</span>
          <div>
            <div style={{fontSize:14,fontWeight:800,color:theme.text,lineHeight:1.2}}>{t.appName}</div>
            <div style={{fontSize:9,color:theme.accent,fontWeight:600,letterSpacing:0.5}}>{t.tagline}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:7,alignItems:"center"}}>
          {overdueDebts.length>0&&<div style={{background:theme.red+"20",border:`1px solid ${theme.red}35`,borderRadius:18,padding:"3px 9px",fontSize:10,color:theme.red,fontWeight:700,cursor:"pointer"}} onClick={()=>setTab("debts")}>⚠️ {overdueDebts.length} Due</div>}
          <button onClick={()=>setIsDark(d=>!d)} style={bS(theme)}>{isDark?"☀️":"🌙"}</button>
          <button onClick={()=>setLang(l=>l==="en"?"hi":"en")} style={bS(theme)}>🌐</button>
          {unresolvedCount>0&&<div style={{position:"relative"}}><button onClick={()=>setTab("fraud")} style={bS(theme)}>🔔</button><span style={{position:"absolute",top:-4,right:-4,background:theme.red,color:"#fff",borderRadius:"50%",width:14,height:14,fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{unresolvedCount}</span></div>}
          <div onClick={()=>setTab("profile")} style={{width:33,height:33,borderRadius:17,background:theme.accent,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:12,fontWeight:700,color:"#fff"}}>{initials}</div>
        </div>
      </div>

      {/* Overdue banner */}
      {overdueDebts.length>0&&tab!=="debts"&&(
        <div onClick={()=>setTab("debts")} style={{background:`linear-gradient(90deg,${theme.red}18,${theme.yellow}18)`,borderBottom:`1px solid ${theme.red}25`,padding:"9px 15px",cursor:"pointer",display:"flex",alignItems:"center",gap:9}}>
          <span style={{fontSize:15}}>⏰</span>
          <div style={{flex:1}}>
            <div style={{fontSize:11,fontWeight:700,color:theme.red}}>{t.debtReminder}</div>
            <div style={{fontSize:10,color:theme.textSec}}>{overdueDebts.map(d=>d.name).join(", ")}</div>
          </div>
          <span style={{fontSize:11,color:theme.accent,fontWeight:600}}>View →</span>
        </div>
      )}

      <div style={{flex:1,overflowY:"auto",paddingBottom:70}}>

        {/* DASHBOARD */}
        {tab==="dashboard"&&(
          <div style={{padding:15,display:"flex",flexDirection:"column",gap:13,animation:"fadeIn 0.3s ease"}}>
            <div><div style={{fontSize:12,color:theme.textSec}}>{grt},</div><div style={{fontSize:21,fontWeight:800,color:theme.text}}>{user.fullName.split(" ")[0]} 👋</div></div>
            <div onClick={()=>{setNewBal(balance.toString());setBalModal(true);}} style={{background:`linear-gradient(135deg,${theme.accent},${theme.purple})`,borderRadius:20,padding:20,cursor:"pointer",position:"relative",overflow:"hidden"}}>
              <div style={{position:"relative",zIndex:2}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",fontWeight:600,marginBottom:5}}>{t.totalBalance}</div>
                <div style={{fontSize:30,fontWeight:800,color:"#fff",letterSpacing:-1}}>₹{balance.toLocaleString("en-IN")}</div>
                {user.banks?.length>0&&<div style={{fontSize:10,color:"rgba(255,255,255,0.6)",marginTop:5}}>{BANK_LOGOS[user.banks[0].bankName]||"🏦"} {user.banks[0].bankName} · {maskAcc(user.banks[0].accountNumber)}</div>}
                <div style={{fontSize:9,color:"rgba(255,255,255,0.45)",marginTop:3}}>Tap to update ✏️</div>
              </div>
              <div style={{position:"absolute",top:-28,right:-28,width:100,height:100,background:"rgba(255,255,255,0.1)",borderRadius:"50%"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
              {[{l:t.monthlySpend,v:`₹${(monthlySpend/1000).toFixed(0)}k`,c:theme.purple,i:"💸"},{l:t.fraudBlocked,v:`₹${(fraudBlocked/1000).toFixed(0)}k`,c:theme.green,i:"🛡️"},{l:t.healthScore,v:`${healthScore}`,c:healthColor,i:"❤️"},{l:t.debts,v:`₹${(totalDebt/100000).toFixed(1)}L`,c:theme.red,i:"💸"}].map((c,i)=>(
                <div key={i} style={{background:theme.card,borderRadius:13,padding:10,border:`1px solid ${c.c}22`,textAlign:"center"}}>
                  <div style={{fontSize:15,marginBottom:2}}>{c.i}</div>
                  <div style={{fontSize:11,fontWeight:800,color:c.c}}>{c.v}</div>
                  <div style={{fontSize:7,color:theme.textMuted,fontWeight:600,marginTop:1}}>{c.l}</div>
                </div>
              ))}
            </div>
            {overdueDebts.length>0&&(
              <div style={{background:theme.red+"0d",border:`1px solid ${theme.red}25`,borderRadius:14,padding:13}}>
                <div style={{fontSize:12,fontWeight:700,color:theme.red,marginBottom:8}}>⏰ {t.debtReminder}</div>
                {overdueDebts.slice(0,2).map(d=>(
                  <div key={d.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                    <span style={{fontSize:11,color:theme.textSec}}>{d.name}</span>
                    <span style={{fontSize:11,fontWeight:700,color:theme.red}}>₹{(d.total-d.paid).toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <button onClick={()=>setTab("debts")} style={{fontSize:10,color:theme.accent,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600,marginTop:3}}>View all debts →</button>
              </div>
            )}
            <Card theme={theme} title={t.monthlyTrend} extra={<div style={{display:"flex",gap:7,alignItems:"center"}}><span style={{width:6,height:6,borderRadius:3,background:theme.green,display:"inline-block"}}/><span style={{fontSize:8,color:theme.textMuted}}>{t.income}</span><span style={{width:6,height:6,borderRadius:3,background:theme.purple,display:"inline-block"}}/><span style={{fontSize:8,color:theme.textMuted}}>{t.expenses}</span></div>}>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={MONTHLY}>
                  <defs>
                    <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.green} stopOpacity={0.3}/><stop offset="95%" stopColor={theme.green} stopOpacity={0}/></linearGradient>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.purple} stopOpacity={0.3}/><stop offset="95%" stopColor={theme.purple} stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.border}/>
                  <XAxis dataKey="month" tick={{fill:theme.textMuted,fontSize:9}} axisLine={false}/>
                  <YAxis tick={{fill:theme.textMuted,fontSize:8}} axisLine={false} tickFormatter={v=>`₹${v/1000}k`}/>
                  <Tooltip contentStyle={{background:isDark?"#1E293B":"#fff",border:`1px solid ${theme.border}`,borderRadius:8,color:theme.text,fontSize:11}} formatter={v=>[`₹${Number(v).toLocaleString()}`,""]}/>
                  <Area type="monotone" dataKey="income" stroke={theme.green} fill="url(#ig)" strokeWidth={2}/>
                  <Area type="monotone" dataKey="spend" stroke={theme.purple} fill="url(#sg)" strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            {catData.length>0&&(
              <Card theme={theme} title={t.spendByCat}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <PieChart width={120} height={120}><Pie data={catData} dataKey="value" cx={60} cy={60} innerRadius={33} outerRadius={56} paddingAngle={3}>{catData.map((e,i)=><Cell key={i} fill={e.color} stroke="transparent"/>)}</Pie><Tooltip contentStyle={{background:isDark?"#1E293B":"#fff",border:`1px solid ${theme.border}`,borderRadius:8,color:theme.text,fontSize:11}} formatter={v=>[`₹${Number(v).toLocaleString()}`,""]} /></PieChart>
                  <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
                    {catData.map((c,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:7}}>
                        <div style={{width:6,height:6,borderRadius:3,background:c.color,flexShrink:0}}/>
                        <div style={{flex:1,minWidth:0}}><div style={{fontSize:10,fontWeight:600,color:theme.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div><div style={{fontSize:9,color:theme.textMuted}}>₹{c.value.toLocaleString("en-IN")}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
            <Card theme={theme} title={t.recentTx} extra={<span onClick={()=>setTab("transactions")} style={{fontSize:11,color:theme.accent,cursor:"pointer",fontWeight:600}}>{t.viewAll}</span>}>
              {txs.slice(0,4).map(tx=><TxRow key={tx.id} tx={tx} theme={theme} t={t}/>)}
            </Card>
          </div>
        )}

        {/* TRANSACTIONS */}
        {tab==="transactions"&&(
          <div style={{padding:15,display:"flex",flexDirection:"column",gap:11,animation:"fadeIn 0.3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:theme.text}}>{t.allTx}</div>
              <button onClick={()=>setTxModal(true)} style={{background:theme.accent,border:"none",borderRadius:18,padding:"7px 13px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{t.addTx}</button>
            </div>
            <div style={{display:"flex",gap:7}}>
              {["all","safe","flagged"].map(f=>(
                <button key={f} onClick={()=>setTxFilter(f)} style={{padding:"5px 11px",borderRadius:18,border:`1px solid ${txFilter===f?theme.accent:theme.border}`,background:txFilter===f?theme.accent+"18":"transparent",color:txFilter===f?theme.accent:theme.textMuted,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                  {f==="all"?t.allTx:f==="safe"?t.safe:t.suspicious} ({f==="all"?txs.length:f==="safe"?txs.filter(x=>x.status==="safe").length:txs.filter(x=>x.status!=="safe").length})
                </button>
              ))}
            </div>
            {filteredTxs.length===0?<div style={{textAlign:"center",padding:40,color:theme.textMuted}}>{t.noTx}</div>:
              filteredTxs.map(tx=>(
                <div key={tx.id} style={{background:theme.card,borderRadius:15,padding:12,border:`1px solid ${theme.border}`,borderLeft:`4px solid ${tx.status==="safe"?theme.green:tx.status==="blocked"?theme.red:theme.yellow}`,display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:36,height:36,borderRadius:11,background:(CAT_COLORS[tx.category]||theme.accent)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{CAT_ICONS[tx.category]||"💳"}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:theme.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tx.name}</div>
                    <div style={{fontSize:10,color:theme.textMuted,marginTop:1}}>{tx.merchant} · {tx.time}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                      <span style={{fontSize:9,color:theme.textMuted,width:52}}>{t.riskScore}: {tx.risk}%</span>
                      <div style={{flex:1,height:4,background:theme.inputBg,borderRadius:2,overflow:"hidden"}}><div style={{width:`${tx.risk}%`,height:"100%",background:tx.risk>70?theme.red:tx.risk>40?theme.yellow:theme.green,borderRadius:2}}/></div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                    <div style={{fontSize:13,fontWeight:800,color:tx.amount>0?theme.green:theme.text}}>{tx.amount>0?"+":""}₹{Math.abs(tx.amount).toLocaleString("en-IN")}</div>
                    <div style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:5,background:tx.status==="safe"?theme.green+"18":tx.status==="blocked"?theme.red+"18":theme.yellow+"18",color:tx.status==="safe"?theme.green:tx.status==="blocked"?theme.red:theme.yellow}}>{t[tx.status]}</div>
                    <button onClick={()=>{setTxs(p=>p.filter(x=>x.id!==tx.id));setBalance(b=>b-tx.amount);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,padding:1}}>🗑️</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* FRAUD */}
        {tab==="fraud"&&(
          <div style={{padding:15,display:"flex",flexDirection:"column",gap:11,animation:"fadeIn 0.3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:theme.text}}>{t.fraudTitle}</div>
              {alerts.filter(a=>!a.resolved).length>0&&<button onClick={()=>setAlerts(a=>a.map(x=>({...x,resolved:true})))} style={{background:theme.green+"12",border:`1px solid ${theme.green}35`,borderRadius:15,padding:"5px 11px",color:theme.green,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Resolve All</button>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9}}>
              {[{l:t.activeAlerts,v:alerts.filter(a=>!a.resolved).length,c:theme.red},{l:t.resolved.replace("✅ ",""),v:alerts.filter(a=>a.resolved).length,c:theme.green},{l:"High Risk",v:alerts.filter(a=>a.risk==="high").length,c:theme.yellow}].map((s,i)=>(
                <div key={i} style={{background:theme.card,borderRadius:14,padding:11,border:`1.5px solid ${s.c}35`,textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</div>
                  <div style={{fontSize:9,color:theme.textMuted,fontWeight:600,marginTop:3}}>{s.l}</div>
                </div>
              ))}
            </div>
            {alerts.filter(a=>!a.resolved).length===0?<div style={{background:theme.card,borderRadius:18,padding:34,textAlign:"center",border:`1px solid ${theme.border}`}}><div style={{fontSize:42,marginBottom:11}}>🛡️</div><div style={{fontSize:13,color:theme.textSec}}>{t.noAlerts}</div></div>:
              alerts.filter(a=>!a.resolved).map(al=>(
                <div key={al.id} style={{background:theme.card,borderRadius:16,padding:15,border:`1.5px solid ${al.risk==="high"?theme.red+"45":al.risk==="medium"?theme.yellow+"45":theme.green+"45"}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{background:al.risk==="high"?theme.red+"18":al.risk==="medium"?theme.yellow+"18":theme.green+"18",borderRadius:18,padding:"3px 9px"}}>
                      <span style={{fontSize:10,fontWeight:800,color:al.risk==="high"?theme.red:al.risk==="medium"?theme.yellow:theme.green}}>{al.risk==="high"?t.highRisk:al.risk==="medium"?t.mediumRisk:t.lowRisk}</span>
                    </div>
                    <span style={{fontSize:10,color:theme.textMuted}}>{al.time}</span>
                  </div>
                  <div style={{fontSize:14,fontWeight:800,color:theme.text,marginBottom:5}}>{al.title}</div>
                  <div style={{fontSize:12,color:theme.textSec,marginBottom:al.amount>0?6:11,lineHeight:1.5}}>{al.desc}</div>
                  {al.amount>0&&<div style={{fontSize:13,fontWeight:800,color:theme.red,marginBottom:11}}>₹{al.amount.toLocaleString("en-IN")}</div>}
                  <div style={{display:"flex",gap:9}}>
                    <button onClick={()=>setAlerts(p=>p.map(x=>x.id===al.id?{...x,resolved:true}:x))} style={{flex:1,background:theme.green+"12",border:`1px solid ${theme.green}35`,borderRadius:11,padding:8,color:theme.green,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✓ {t.resolve}</button>
                    <button onClick={()=>setAlerts(p=>p.map(x=>x.id===al.id?{...x,resolved:true}:x))} style={{flex:1,background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:11,padding:8,color:theme.textMuted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{t.dismiss}</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* HEALTH */}
        {tab==="health"&&(
          <div style={{padding:15,display:"flex",flexDirection:"column",gap:13,animation:"fadeIn 0.3s ease"}}>
            <div style={{fontSize:20,fontWeight:800,color:theme.text}}>{t.financialHealth}</div>
            <div style={{background:theme.card,borderRadius:22,padding:20,border:`1px solid ${theme.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:13}}>
              <div style={{position:"relative",width:144,height:144}}>
                <svg width={144} height={144} style={{transform:"rotate(-90deg)"}}>
                  <circle cx={72} cy={72} r={60} fill="none" stroke={theme.border} strokeWidth={10}/>
                  <circle cx={72} cy={72} r={60} fill="none" stroke={healthColor} strokeWidth={10} strokeDasharray={`${(healthScore/100)*377} 377`} strokeLinecap="round" style={{filter:`drop-shadow(0 0 5px ${healthColor})`}}/>
                </svg>
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <div style={{fontSize:34,fontWeight:900,color:healthColor,lineHeight:1}}>{healthScore}</div>
                  <div style={{fontSize:10,color:theme.textMuted}}>/100</div>
                  <div style={{fontSize:10,fontWeight:700,color:healthColor,marginTop:1}}>{healthScore>=80?t.excellent:healthScore>=60?t.good:healthScore>=40?t.fair:t.poor}</div>
                </div>
              </div>
              <div style={{display:"flex",width:"100%",borderTop:`1px solid ${theme.border}`,paddingTop:13}}>
                {[{l:"Savings",v:`₹${Math.max(0,balance-monthlySpend).toLocaleString("en-IN")}`,c:theme.green},{l:"Spent",v:`₹${monthlySpend.toLocaleString("en-IN")}`,c:theme.purple},{l:"Debt",v:`₹${(totalDebt/100000).toFixed(1)}L`,c:theme.red}].map((it,i)=>(
                  <div key={i} style={{flex:1,textAlign:"center",borderRight:i<2?`1px solid ${theme.border}`:"none"}}>
                    <div style={{fontSize:11,fontWeight:800,color:it.c}}>{it.v}</div>
                    <div style={{fontSize:8,color:theme.textMuted,marginTop:2}}>{it.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <Card theme={theme} title={t.healthBreakdown}>
              {[
                {k:t.savingsRatio,v:Math.min(100,Math.round(((Math.max(0,balance-monthlySpend))/(balance||1))*100)),c:theme.green},
                {k:t.expenseBehavior,v:Math.min(100,Math.round(100-(monthlySpend/(balance||1))*100)),c:theme.accent},
                {k:t.riskFreq,v:Math.max(0,100-txs.filter(x=>x.status!=="safe").length*15),c:theme.yellow},
                {k:t.debtLvl,v:Math.max(0,100-Math.round((totalDebt/1000000)*100)),c:theme.purple},
              ].map((b,i)=>(
                <div key={i} style={{marginBottom:13}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:12,color:theme.textSec,fontWeight:600}}>{b.k}</span>
                    <span style={{fontSize:12,fontWeight:800,color:b.c}}>{b.v}%</span>
                  </div>
                  <div style={{height:7,background:theme.inputBg,borderRadius:4,overflow:"hidden"}}><div style={{width:`${b.v}%`,height:"100%",borderRadius:4,background:b.c,transition:"width 0.6s"}}/></div>
                </div>
              ))}
            </Card>
            <Card theme={theme} title={t.tips}>
              {[t.tip1,t.tip2,t.tip3].map((tip,i)=>(
                <div key={i} style={{padding:"9px 0",borderBottom:i<2?`1px solid ${theme.border}`:"none",fontSize:12,color:theme.textSec,lineHeight:1.6}}>{tip}</div>
              ))}
            </Card>
          </div>
        )}

        {/* DEBTS */}
        {tab==="debts"&&(
          <div style={{padding:15,display:"flex",flexDirection:"column",gap:11,animation:"fadeIn 0.3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:theme.text}}>{t.debtTitle}</div>
              <button onClick={()=>setDebtModal(true)} style={{background:theme.accent,border:"none",borderRadius:18,padding:"7px 13px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{t.addDebt}</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9}}>
              {[{l:t.totalDebt,v:`₹${(debts.reduce((s,d)=>s+d.total,0)/100000).toFixed(1)}L`,c:theme.red},{l:t.debtPaidAmt,v:`₹${(debts.reduce((s,d)=>s+d.paid,0)/100000).toFixed(1)}L`,c:theme.green},{l:t.remaining,v:`₹${(totalDebt/100000).toFixed(1)}L`,c:theme.yellow}].map((s,i)=>(
                <div key={i} style={{background:theme.card,borderRadius:14,padding:11,border:`1.5px solid ${s.c}28`,textAlign:"center"}}>
                  <div style={{fontSize:14,fontWeight:800,color:s.c}}>{s.v}</div>
                  <div style={{fontSize:8,color:theme.textMuted,fontWeight:600,marginTop:3}}>{s.l}</div>
                </div>
              ))}
            </div>
            {debts.length===0?<div style={{background:theme.card,borderRadius:18,padding:38,textAlign:"center",border:`1px solid ${theme.border}`}}><div style={{fontSize:42,marginBottom:11}}>🎉</div><div style={{fontSize:13,color:theme.textSec}}>{t.noDebts}</div></div>:
              debts.map(d=>{
                const rem=d.total-d.paid,pct=Math.round((d.paid/d.total)*100);
                const due=new Date(d.dueDate),now=new Date();
                const diff=Math.ceil((due-now)/(1000*60*60*24));
                const st=diff<0?"overdue":diff===0?"today":diff<=7?"soon":"ok";
                const sc={overdue:theme.red,today:theme.yellow,soon:theme.yellow,ok:theme.green};
                const sl={overdue:t.overdue,today:t.dueToday,soon:t.dueSoon,ok:`${diff}d left`};
                return(
                  <div key={d.id} style={{background:theme.card,borderRadius:17,padding:15,border:`1.5px solid ${d.color}35`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9}}>
                      <div>
                        <div style={{fontSize:14,fontWeight:800,color:theme.text}}>{d.name}</div>
                        <div style={{fontSize:10,color:theme.textMuted,marginTop:2}}>{d.type}</div>
                      </div>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        <div style={{background:sc[st]+"18",borderRadius:18,padding:"2px 8px"}}><span style={{fontSize:9,fontWeight:800,color:sc[st]}}>{sl[st]}</span></div>
                        <button onClick={()=>setDebts(p=>p.filter(x=>x.id!==d.id))} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:theme.textMuted}}>🗑️</button>
                      </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <div><div style={{fontSize:10,color:theme.textMuted}}>Remaining</div><div style={{fontSize:15,fontWeight:800,color:d.color}}>₹{rem.toLocaleString("en-IN")}</div></div>
                      <div style={{textAlign:"right"}}><div style={{fontSize:10,color:theme.textMuted}}>Due</div><div style={{fontSize:12,fontWeight:700,color:sc[st]}}>{due.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</div></div>
                    </div>
                    <div style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:9,color:theme.textMuted}}>Progress</span><span style={{fontSize:9,fontWeight:700,color:theme.green}}>{pct}% paid</span></div>
                      <div style={{height:7,background:theme.inputBg,borderRadius:4,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${d.color},${theme.green})`,borderRadius:4}}/></div>
                    </div>
                    <button onClick={()=>{const pay=prompt("Enter payment amount (₹):");const p=parseFloat(pay);if(p&&p>0&&p<=rem)setDebts(prev=>prev.map(x=>x.id===d.id?{...x,paid:x.paid+p}:x));}} style={{width:"100%",background:theme.green+"12",border:`1px solid ${theme.green}35`,borderRadius:11,padding:9,color:theme.green,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>💳 {t.markPaid}</button>
                  </div>
                );
              })
            }
          </div>
        )}

        {/* AI ASSISTANT */}
        {tab==="assistant"&&(
          <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 138px)",animation:"fadeIn 0.3s ease"}}>
            {(voice.isListening||voice.isSpeaking)&&(
              <div style={{background:voice.isListening?theme.red+"12":theme.green+"12",borderBottom:`1px solid ${voice.isListening?theme.red:theme.green}25`,padding:"8px 15px",display:"flex",alignItems:"center",gap:9}}>
                <div style={{width:7,height:7,borderRadius:4,background:voice.isListening?theme.red:theme.green,animation:"pulse 1s infinite"}}/>
                <span style={{fontSize:11,fontWeight:600,color:voice.isListening?theme.red:theme.green,flex:1}}>{voice.isListening?t.listening:t.speaking}</span>
                <button onClick={voice.isListening?voice.stopListening:voice.stopSpeaking} style={{background:"none",border:`1px solid ${voice.isListening?theme.red:theme.green}40`,borderRadius:11,padding:"3px 9px",cursor:"pointer",color:voice.isListening?theme.red:theme.green,fontSize:10,fontFamily:"inherit",fontWeight:600}}>{t.stopListening}</button>
              </div>
            )}
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 15px",borderBottom:`1px solid ${theme.border}`}}>
              <div style={{width:38,height:38,borderRadius:12,background:theme.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,border:`1px solid ${theme.accent}35`}}>🛡️</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:theme.text}}>{t.aiAssistant}</div><div style={{fontSize:10,color:theme.green,fontWeight:600}}>● {t.online}</div></div>
              {voice.isSpeaking&&<button onClick={voice.stopSpeaking} style={{background:theme.red+"12",border:`1px solid ${theme.red}25`,borderRadius:11,padding:"4px 9px",cursor:"pointer",color:theme.red,fontSize:10,fontFamily:"inherit",fontWeight:600}}>🔇 {t.stopSpeaking}</button>}
            </div>
            <div style={{display:"flex",gap:7,overflowX:"auto",padding:"8px 15px",borderBottom:`1px solid ${theme.border}`}}>
              {t.suggested.map((q,i)=>(
                <button key={i} onClick={()=>sendChat(q)} style={{background:theme.accent+"10",border:`1px solid ${theme.accent}22`,borderRadius:18,padding:"5px 11px",color:theme.accent,fontSize:10,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",fontWeight:600,flexShrink:0}}>{q}</button>
              ))}
            </div>
            <div ref={chatRef} style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:9}}>
              {messages.map(m=>(
                <div key={m.id} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",alignItems:"flex-end",gap:7,animation:"fadeIn 0.2s ease"}}>
                  {m.role==="assistant"&&<div style={{width:24,height:24,borderRadius:7,background:theme.accent+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0}}>🛡️</div>}
                  <div style={{maxWidth:"80%",padding:"9px 13px",borderRadius:m.role==="user"?"15px 15px 3px 15px":"15px 15px 15px 3px",background:m.role==="user"?`linear-gradient(135deg,${theme.accent},${theme.purple})`:`${theme.card}`,border:m.role==="user"?"none":`1px solid ${theme.border}`,fontSize:13,lineHeight:1.6,color:m.role==="user"?"#fff":theme.text}}>{m.text}</div>
                  {m.role==="assistant"&&<button onClick={()=>voice.speak(m.text)} title="Read aloud" style={{background:"none",border:"none",cursor:"pointer",fontSize:13,opacity:0.55,flexShrink:0}}>🔊</button>}
                </div>
              ))}
              {thinking&&(
                <div style={{display:"flex",alignItems:"flex-end",gap:7}}>
                  <div style={{width:24,height:24,borderRadius:7,background:theme.accent+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>🛡️</div>
                  <div style={{background:theme.card,border:`1px solid ${theme.border}`,borderRadius:"15px 15px 15px 3px",padding:"9px 13px",display:"flex",gap:4,alignItems:"center"}}>
                    {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:3,background:theme.accent,animation:`pulse 1.2s ${i*0.2}s infinite`}}/>)}
                    <span style={{fontSize:10,color:theme.textMuted,marginLeft:5}}>{t.thinking}</span>
                  </div>
                </div>
              )}
            </div>
            <div style={{display:"flex",gap:8,padding:"9px 13px",borderTop:`1px solid ${theme.border}`,background:theme.bg,alignItems:"center"}}>
              <button onClick={handleVoice} title={t.voiceInput} style={{width:42,height:42,borderRadius:21,border:`2px solid ${voice.isListening?theme.red:theme.accent}35`,background:voice.isListening?theme.red+"18":theme.accent+"0d",cursor:"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative",transition:"all 0.2s"}}>
                {voice.isListening&&<div style={{position:"absolute",inset:-4,borderRadius:25,border:`2px solid ${theme.red}60`,animation:"ripple 1s infinite"}}/>}
                {voice.isListening?"🔴":"🎙️"}
              </button>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat(chatInput)} placeholder={voice.isListening?t.listening:t.askPlaceholder} style={{flex:1,background:theme.card,border:`1px solid ${theme.border}`,borderRadius:21,padding:"10px 15px",fontSize:13,color:theme.text}}/>
              <button onClick={()=>sendChat(chatInput)} disabled={!chatInput.trim()||thinking} style={{width:42,height:42,borderRadius:21,background:theme.accent,border:"none",color:"#fff",fontSize:16,cursor:"pointer",opacity:!chatInput.trim()||thinking?0.4:1,flexShrink:0}}>➤</button>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {tab==="profile"&&(
          <div style={{padding:15,display:"flex",flexDirection:"column",gap:11,animation:"fadeIn 0.3s ease"}}>
            <div style={{background:theme.card,borderRadius:22,padding:20,border:`1px solid ${theme.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:11}}>
              <div style={{width:72,height:72,borderRadius:36,background:theme.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:800,color:"#fff",boxShadow:`0 4px 18px ${theme.accent}45`}}>{initials}</div>
              <div style={{fontSize:19,fontWeight:800,color:theme.text}}>{user.fullName}</div>
              <div style={{fontSize:12,color:theme.textSec}}>{user.email}</div>
              {user.phone&&<div style={{fontSize:11,color:theme.textMuted}}>{user.phone}</div>}
              {user.authMethod==="google"&&<div style={{background:"#4285F412",borderRadius:11,padding:"3px 11px",border:"1px solid #4285F428",fontSize:10,color:"#4285F4",fontWeight:600}}>G Google Account</div>}
              <div style={{display:"flex",width:"100%",borderTop:`1px solid ${theme.border}`,paddingTop:13}}>
                {[{l:t.totalSaved,v:`₹${Math.max(0,balance-50000).toLocaleString("en-IN")}`,c:theme.green},{l:t.txCount,v:txs.length.toString(),c:theme.accent},{l:t.memberSince,v:user.joinDate,c:theme.purple}].map((it,i)=>(
                  <div key={i} style={{flex:1,textAlign:"center",borderRight:i<2?`1px solid ${theme.border}`:"none"}}>
                    <div style={{fontSize:10,fontWeight:800,color:it.c}}>{it.v}</div>
                    <div style={{fontSize:7,color:theme.textMuted,marginTop:2}}>{it.l}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>{setEditForm({fullName:user.fullName,phone:user.phone||""});setEditModal(true);}} style={{background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:13,padding:"8px 17px",color:theme.text,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>✏️ {t.editProfile}</button>
            </div>

            {/* Bank Accounts */}
            <div style={{background:theme.card,borderRadius:18,border:`1px solid ${theme.border}`,overflow:"hidden"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 15px 7px",borderBottom:`1px solid ${theme.border}`}}>
                <span style={{fontSize:10,fontWeight:700,color:theme.textMuted,letterSpacing:0.5}}>{t.linkedBanks}</span>
                <button onClick={()=>setBankModal(true)} style={{background:theme.accent+"18",border:"none",borderRadius:11,padding:"3px 9px",cursor:"pointer",color:theme.accent,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>+ Add</button>
              </div>
              {(!user.banks||user.banks.length===0)?
                <div style={{padding:"18px 15px",textAlign:"center",fontSize:12,color:theme.textMuted}}>{t.noBank}</div>:
                user.banks.map((b,i)=>(
                  <div key={b.id||i} style={{display:"flex",gap:11,alignItems:"center",padding:"11px 15px",borderBottom:i<user.banks.length-1?`1px solid ${theme.border}`:"none"}}>
                    <div style={{width:42,height:42,borderRadius:13,background:theme.accent+"12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{BANK_LOGOS[b.bankName]||"🏦"}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:theme.text}}>{b.bankName} Bank</div>
                      <div style={{fontSize:10,color:theme.textMuted,marginTop:1}}>{maskAcc(b.accountNumber)}</div>
                      <div style={{fontSize:9,color:theme.textMuted,marginTop:1}}>{b.accountHolder} · {b.accountType}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                      <div style={{background:theme.green+"18",borderRadius:9,padding:"2px 7px",fontSize:9,color:theme.green,fontWeight:700}}>✓ Linked</div>
                      <div style={{fontSize:9,color:theme.textMuted}}>{b.ifscCode}</div>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Settings */}
            <div style={{background:theme.card,borderRadius:18,border:`1px solid ${theme.border}`,overflow:"hidden"}}>
              <div style={{fontSize:10,fontWeight:700,color:theme.textMuted,letterSpacing:0.5,padding:"11px 15px 7px",borderBottom:`1px solid ${theme.border}`}}>{t.settings}</div>
              {[
                {icon:"🌙",label:t.darkMode,right:<Tog v={isDark} set={()=>setIsDark(d=>!d)} c={theme.accent}/>},
                {icon:"🌐",label:t.language,right:<button onClick={()=>setLang(l=>l==="en"?"hi":"en")} style={{background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:9,padding:"3px 11px",cursor:"pointer",color:theme.text,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>{lang==="en"?"🇮🇳 हिंदी":"🇬🇧 English"}</button>},
                {icon:"🔔",label:t.notifications,right:<Tog v={notifOn} set={()=>setNotifOn(n=>!n)} c={theme.accent}/>,last:true},
              ].map((row,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",padding:"12px 15px",borderBottom:row.last?"none":`1px solid ${theme.border}`,gap:11}}>
                  <span style={{fontSize:17}}>{row.icon}</span><span style={{flex:1,fontSize:13,color:theme.text,fontWeight:500}}>{row.label}</span>{row.right}
                </div>
              ))}
            </div>

            {/* Debt summary */}
            <div style={{background:theme.card,borderRadius:18,border:`1px solid ${theme.red}22`,overflow:"hidden"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 15px 7px",borderBottom:`1px solid ${theme.border}`}}>
                <span style={{fontSize:10,fontWeight:700,color:theme.textMuted,letterSpacing:0.5}}>{t.debtTitle.toUpperCase()}</span>
                <button onClick={()=>setTab("debts")} style={{background:"none",border:"none",cursor:"pointer",color:theme.accent,fontSize:10,fontWeight:700,fontFamily:"inherit"}}>View All →</button>
              </div>
              <div style={{padding:"11px 15px",display:"flex",flexDirection:"column",gap:7}}>
                {debts.length===0?<div style={{fontSize:11,color:theme.textMuted,textAlign:"center",padding:"6px 0"}}>No debts 🎉</div>:
                  debts.slice(0,3).map(d=>{const ov=new Date(d.dueDate)<new Date();return(
                    <div key={d.id} style={{display:"flex",alignItems:"center",gap:9}}>
                      <div style={{width:7,height:7,borderRadius:4,background:d.color,flexShrink:0}}/>
                      <span style={{flex:1,fontSize:12,color:theme.text,fontWeight:500}}>{d.name}</span>
                      <span style={{fontSize:11,fontWeight:700,color:ov?theme.red:theme.yellow}}>₹{(d.total-d.paid).toLocaleString("en-IN")}</span>
                      {ov&&<span style={{fontSize:8,background:theme.red+"18",color:theme.red,borderRadius:7,padding:"1px 5px",fontWeight:700}}>OVERDUE</span>}
                    </div>
                  );})}
              </div>
            </div>

            <button onClick={()=>setUser(null)} style={{background:theme.red+"10",border:`1px solid ${theme.red}22`,borderRadius:15,padding:13,color:theme.red,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>🚪 {t.logout}</button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:theme.navBg,borderTop:`1px solid ${theme.border}`,display:"flex",backdropFilter:"blur(20px)",zIndex:100}}>
        {tabs.map(([id,icon,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"7px 2px",display:"flex",flexDirection:"column",alignItems:"center",gap:2,borderTop:`2px solid ${tab===id?theme.accent:"transparent"}`,position:"relative",fontFamily:"inherit"}}>
            <span style={{fontSize:15,opacity:tab===id?1:0.38}}>{icon}</span>
            <span style={{fontSize:6.5,fontWeight:700,color:tab===id?theme.accent:theme.textMuted,letterSpacing:0.2}}>{label}</span>
            {id==="fraud"&&unresolvedCount>0&&<span style={{position:"absolute",top:3,right:"50%",marginRight:-13,background:theme.red,color:"#fff",borderRadius:6,width:12,height:12,fontSize:7,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{unresolvedCount}</span>}
            {id==="debts"&&overdueDebts.length>0&&<span style={{position:"absolute",top:3,right:"50%",marginRight:-13,background:theme.yellow,color:"#000",borderRadius:6,width:12,height:12,fontSize:7,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{overdueDebts.length}</span>}
          </button>
        ))}
      </div>

      {/* MODALS */}
      {balModal&&<Mod theme={theme} onClose={()=>setBalModal(false)}>
        <div style={{fontSize:17,fontWeight:800,color:theme.text,marginBottom:5}}>{t.updateBalance}</div>
        <div style={{fontSize:11,color:theme.textSec,marginBottom:13}}>{t.enterBalance}</div>
        <input value={newBal} onChange={e=>setNewBal(e.target.value)} type="number" style={{width:"100%",background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:11,padding:"12px 13px",fontSize:20,fontWeight:700,color:theme.text,textAlign:"center",marginBottom:16}} autoFocus/>
        <div style={{display:"flex",gap:9}}><button onClick={()=>setBalModal(false)} style={cB(theme)}>{t.cancel}</button><button onClick={()=>{const v=parseFloat(newBal);if(!isNaN(v)&&v>=0){setBalance(v);setBalModal(false);}}} style={pB(theme)}>{t.update}</button></div>
      </Mod>}

      {txModal&&<Mod theme={theme} onClose={()=>setTxModal(false)}>
        <div style={{fontSize:17,fontWeight:800,color:theme.text,marginBottom:16}}>{t.addTx}</div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {["debit","credit"].map(tp=>(
            <button key={tp} onClick={()=>setTxForm(f=>({...f,type:tp}))} style={{flex:1,padding:10,borderRadius:11,border:`1px solid ${txForm.type===tp?(tp==="debit"?theme.red:theme.green):theme.border}`,background:txForm.type===tp?(tp==="debit"?theme.red+"10":theme.green+"10"):"transparent",color:txForm.type===tp?(tp==="debit"?theme.red:theme.green):theme.textMuted,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              {tp==="debit"?`📤 ${t.debit}`:`📥 ${t.credit}`}
            </button>
          ))}
        </div>
        {[{k:"name",l:t.txName,tp:"text"},{k:"amount",l:t.amount,tp:"number"},{k:"merchant",l:t.merchant,tp:"text"}].map(f=>(
          <div key={f.k} style={{marginBottom:11}}>
            <div style={{fontSize:10,fontWeight:700,color:theme.textSec,marginBottom:5}}>{f.l}</div>
            <input value={txForm[f.k]} onChange={e=>setTxForm(p=>({...p,[f.k]:e.target.value}))} type={f.tp} style={{width:"100%",background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:theme.text}}/>
          </div>
        ))}
        <div style={{fontSize:10,fontWeight:700,color:theme.textSec,marginBottom:6}}>{t.category}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
          {CATS.map((c,i)=>(
            <button key={c} onClick={()=>setTxForm(f=>({...f,category:c}))} style={{padding:"4px 10px",borderRadius:16,border:`1px solid ${txForm.category===c?(CAT_COLORS[c]||theme.accent):theme.border}`,background:txForm.category===c?(CAT_COLORS[c]||theme.accent)+"15":"transparent",color:txForm.category===c?(CAT_COLORS[c]||theme.accent):theme.textMuted,fontSize:10,cursor:"pointer",fontFamily:"inherit",fontWeight:txForm.category===c?700:400}}>
              {CAT_ICONS[c]} {t.categories[i]||c}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:9}}><button onClick={()=>setTxModal(false)} style={cB(theme)}>{t.cancel}</button><button onClick={addTx} style={pB(theme)}>{t.save}</button></div>
      </Mod>}

      {debtModal&&<Mod theme={theme} onClose={()=>setDebtModal(false)}>
        <div style={{fontSize:17,fontWeight:800,color:theme.text,marginBottom:16}}>{t.addDebt}</div>
        {[{k:"name",l:t.debtName,tp:"text"},{k:"total",l:t.debtAmount,tp:"number"},{k:"paid",l:t.debtPaid,tp:"number"},{k:"dueDate",l:t.dueDate,tp:"date"}].map(f=>(
          <div key={f.k} style={{marginBottom:11}}>
            <div style={{fontSize:10,fontWeight:700,color:theme.textSec,marginBottom:5}}>{f.l}</div>
            <input value={debtForm[f.k]} onChange={e=>setDebtForm(p=>({...p,[f.k]:e.target.value}))} type={f.tp} style={{width:"100%",background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:theme.text,colorScheme:isDark?"dark":"light"}}/>
          </div>
        ))}
        <div style={{fontSize:10,fontWeight:700,color:theme.textSec,marginBottom:6}}>{t.debtType}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
          {["Personal Loan","Home Loan","Car Loan","Credit Card","Education Loan","Other"].map((tp,i)=>(
            <button key={tp} onClick={()=>setDebtForm(f=>({...f,type:tp}))} style={{padding:"4px 10px",borderRadius:16,border:`1px solid ${debtForm.type===tp?theme.accent:theme.border}`,background:debtForm.type===tp?theme.accent+"15":"transparent",color:debtForm.type===tp?theme.accent:theme.textMuted,fontSize:10,cursor:"pointer",fontFamily:"inherit",fontWeight:debtForm.type===tp?700:400}}>
              {t.debtTypes[i]||tp}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:9}}><button onClick={()=>setDebtModal(false)} style={cB(theme)}>{t.cancel}</button><button onClick={addDebt} style={pB(theme)}>{t.save}</button></div>
      </Mod>}

      {bankModal&&<Mod theme={theme} onClose={()=>setBankModal(false)}>
        <div style={{fontSize:17,fontWeight:800,color:theme.text,marginBottom:16}}>{t.addBankAcc}</div>
        <div style={{marginBottom:11}}>
          <div style={{fontSize:10,fontWeight:700,color:theme.textSec,marginBottom:6}}>{t.bankName}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {["SBI","HDFC","ICICI","Axis","Kotak","Other"].map(b=>(
              <button key={b} onClick={()=>setAddBankForm(f=>({...f,bankName:b}))} style={{padding:"5px 11px",borderRadius:18,border:`1px solid ${addBankForm.bankName===b?theme.accent:theme.border}`,background:addBankForm.bankName===b?theme.accent+"15":"transparent",color:addBankForm.bankName===b?theme.accent:theme.textMuted,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                {BANK_LOGOS[b]||"🏦"} {b}
              </button>
            ))}
          </div>
        </div>
        {[{k:"accountHolder",l:t.accountHolder,tp:"text"},{k:"accountNumber",l:t.accountNumber,tp:"number"},{k:"ifscCode",l:t.ifscCode,tp:"text"}].map(f=>(
          <div key={f.k} style={{marginBottom:11}}>
            <div style={{fontSize:10,fontWeight:700,color:theme.textSec,marginBottom:5}}>{f.l}</div>
            <input value={addBankForm[f.k]} onChange={e=>setAddBankForm(p=>({...p,[f.k]:f.k==="ifscCode"?e.target.value.toUpperCase():e.target.value}))} type={f.tp} style={{width:"100%",background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:theme.text}}/>
          </div>
        ))}
        <div style={{display:"flex",gap:7,marginBottom:16}}>
          {["savings","current"].map(tp=>(
            <button key={tp} onClick={()=>setAddBankForm(f=>({...f,accountType:tp}))} style={{flex:1,padding:9,borderRadius:10,border:`1px solid ${addBankForm.accountType===tp?theme.accent:theme.border}`,background:addBankForm.accountType===tp?theme.accent+"15":"transparent",color:addBankForm.accountType===tp?theme.accent:theme.textMuted,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
              {tp==="savings"?`💰 ${t.savings}`:`🏢 ${t.current}`}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:9}}><button onClick={()=>setBankModal(false)} style={cB(theme)}>{t.cancel}</button><button onClick={()=>{if(addBankForm.accountNumber&&addBankForm.accountHolder&&addBankForm.ifscCode){setUser(u=>({...u,banks:[...(u.banks||[]),{...addBankForm,id:Date.now().toString()}]}));setBankModal(false);}}} style={pB(theme)}>{t.addAccount}</button></div>
      </Mod>}

      {editModal&&<Mod theme={theme} onClose={()=>setEditModal(false)}>
        <div style={{fontSize:17,fontWeight:800,color:theme.text,marginBottom:16}}>{t.editProfile}</div>
        {[{k:"fullName",l:t.fullName},{k:"phone",l:t.phone}].map(f=>(
          <div key={f.k} style={{marginBottom:11}}>
            <div style={{fontSize:10,fontWeight:700,color:theme.textSec,marginBottom:5}}>{f.l}</div>
            <input value={editForm[f.k]||""} onChange={e=>setEditForm(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:theme.text}}/>
          </div>
        ))}
        <div style={{display:"flex",gap:9,marginTop:6}}><button onClick={()=>setEditModal(false)} style={cB(theme)}>{t.cancel}</button><button onClick={()=>{if(editForm.fullName?.trim()){setUser(u=>({...u,...editForm}));setEditModal(false);}}} style={pB(theme)}>{t.saveProfile}</button></div>
      </Mod>}
    </div>
  );
}

function Card({theme,title,children,extra}){return(<div style={{background:theme.card,borderRadius:18,padding:13,border:`1px solid ${theme.border}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{fontSize:13,fontWeight:700,color:theme.text}}>{title}</div>{extra}</div>{children}</div>);}
function TxRow({tx,theme,t}){return(<div style={{display:"flex",gap:9,alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${theme.border}`}}><div style={{width:34,height:34,borderRadius:10,background:(CAT_COLORS[tx.category]||"#22D3EE")+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{CAT_ICONS[tx.category]||"💳"}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:theme.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tx.name}</div><div style={{fontSize:9,color:theme.textMuted,marginTop:1}}>{tx.merchant}</div></div><div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0}}><div style={{fontSize:11,fontWeight:700,color:tx.amount>0?theme.green:theme.text}}>{tx.amount>0?"+":""}₹{Math.abs(tx.amount).toLocaleString("en-IN")}</div><div style={{fontSize:8,fontWeight:700,padding:"1px 5px",borderRadius:5,background:tx.status==="safe"?theme.green+"18":tx.status==="blocked"?theme.red+"18":theme.yellow+"18",color:tx.status==="safe"?theme.green:tx.status==="blocked"?theme.red:theme.yellow}}>{t[tx.status]}</div></div></div>);}
function FI({label,v,set,tp="text",theme}){return(<div style={{marginBottom:11}}><div style={{fontSize:10,fontWeight:600,color:theme.textSec,marginBottom:4}}>{label}</div><input value={v} onChange={e=>set(e.target.value)} type={tp} style={{width:"100%",background:theme.inputBg,border:`1px solid ${theme.border}`,borderRadius:10,padding:"11px 12px",fontSize:14,color:theme.text}}/></div>);}
function Tog({v,set,c}){return(<div onClick={set} style={{width:42,height:22,borderRadius:11,background:v?c:"rgba(100,116,139,0.28)",cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}><div style={{position:"absolute",top:2,left:v?21:2,width:18,height:18,borderRadius:9,background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/></div>);}
function Mod({theme,onClose,children}){return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.62)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:500}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div style={{background:theme.modalBg,borderTopLeftRadius:24,borderTopRightRadius:24,padding:22,width:"100%",maxWidth:480,border:`1px solid ${theme.border}`,maxHeight:"87vh",overflowY:"auto",animation:"fadeIn 0.2s ease"}}>{children}</div></div>);}
const pB=(t)=>({flex:1,background:t.accent,border:"none",borderRadius:12,padding:13,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"});
const cB=(t)=>({flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:12,padding:13,color:t.textSec,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"});
const bS=(t)=>({background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:16,padding:"4px 8px",cursor:"pointer",fontSize:13,fontFamily:"inherit"});
