let messageList=[
  // "Advice for new students from the Creative Computing advice bot\n",
  "Advice for new students\nEmbrace the experience\nUniversity is a unique time in your life. Make the most of every opportunity and enjoy the journey.\nThank you for your attention",
  "Advice for new students\nUse online resources\nThe internet offers a wealth of academic resources. Use them to supplement your learning and revision.\nThank you for your attention",
  "Advice for new students\nStep out of your comfort zone\nUniversity is about growth—try new things, attend events, or pick up a new hobby.\nThank you for your attention",
  "Advice for new students\nLearn to manage your time\nBreak assignments into smaller tasks and manage your time well to avoid last minute stress.\nThank you for your attention",
  "Advice for new students\nExplore the library for more than books\nThe library offers online resources, study spaces, and quiet zones. It's a valuable asset for your studies.\nThank you for your attention",
  "Advice for new students\nStay hydrated and eat well\nHealthy eating and hydration are essential for maintaining focus, energy, and overall wellbeing.\nThank you for your attention",
  "Advice for new students\nCheck in on your mental health\nUniversity can be overwhelming—make sure you look after your mental wellbeing and seek support if needed.\nThank you for your attention",
  "Advice for new students\nMake use of discounts\nTake advantage of student discounts on food, travel, and entertainment to stretch your budget further.\nThank you for your attention",
  "Advice for new students\nBe open to new people\nUniversity is a chance to meet people from diverse backgrounds. Embrace the variety and learn from others.\nThank you for your attention",
  "Advice for new students\nStay active\nRegular physical activity keeps your mind sharp and helps you handle the academic pressures better.\nJust going for a walk can help.\nThank you for your attention",
  "Advice for new students\nGet to know Bath\nExplore your city—cafés, parks, museums. Getting to know your surroundings makes your university experience richer.\nThank you for your attention",
  "Advice for new students\nUse office hours\nTake advantage of your lecturers' office hours to clarify doubts or get feedback on your work.\nThank you for your attention",
  "Advice for new students\nGo to lectures and seminars\nAttending lectures in person helps you stay engaged, ask questions, and understand the material better.\nThank you for your attention",
  "Advice for new students\nBackup your files\nAlways save your work in multiple places — cloud storage, external drives—to avoid losing important assignments.\nThank you for your attention",
  "Advice for new students\nMake a budget\nPlan your finances for the term and track your expenses. Don't forget to save for emergencies.\nThank you for your attention",
  "Advice for new students\nFind a balance of study and rest\nBalance your academic responsibilities with downtime. Too much work without rest can lead to burnout.\nThank you for your attention",
  "Advice for new students\nFind people who like what you like\nSocieties are a great way to make friends, pursue hobbies, and get involved in university life.\nThank you for your attention",
  "Advice for new students\nAsk for help\nIf you're struggling, reach out to lecturers, tutors, or student wellbeing services. Everyone's here to support you.\nThank you for your attention",
  "Advice for new students\nStay organised\nMake a weekly plan for study time, assignments, and breaks. Staying organized will reduce stress.\nThank you for your attention",
  "Advice for new students\nDiscover the Campus and its spaces\nTake time to discover the library, study spaces, and student services. Knowing your way around helps later.\nThank you for your attention",
  
  // "How to care for your machines (from ChatGPT)\nEvery machine has its essence, much like the soul of a being.\nFirst seek to understand its purpose and design, and listen to its signals.\nKnowledge is the foundation of compassionate care.\nThank you for your attention",
  // "How to care for your machines (from ChatGPT)\nRegular maintenance is akin to the practice of daily meditation. It prevents the build-up of negative energies that lead to malfunction.\nClean your machines with gentle hands, lubricate their moving parts, and update their software.\nConsistency in care brings harmony and longevity\nThank you for your attention",
  // "How to care for your machines (from ChatGPT)\nPlace each machine in an environment suited to its nature. Ensure proper ventilation, avoid extreme temperatures, and protect them from dust and moisture. A conducive environment fosters peace and productivity.\nThank you for your attention",
  // "How to care for your machines (from ChatGPT)\nHandle every machine with respect. Be gentle in your interactions, avoiding harsh movements and sudden impacts. Treat connectors and buttons with care, and transport machines with caution. Respect begets resilience.\nThank you for your attention",
  // "How to care for your machines (from ChatGPT)\nBe attentive to the subtle signs of distress. Unusual sounds, slower performance, and error messages are cries for help. Do not ignore them, address them promptly. Early intervention can prevent a minor issue from becoming a critical failure.\nThank you for your attention",
  // "How to care for your machines (from ChatGPT)\nEducate all who use the machines about their proper care and operation. Sharing knowledge is an act of kindness that ensures the well-being of the machines. Provide continuous training and updates, fostering a community of informed and mindful users.\nThank you for your attention",
  // "How to care for your machines (from ChatGPT)\nExpress gratitude for the service each machine provides. Acknowledge their contributions to your tasks and lives. A moment of appreciation can cultivate a respectful and positive relationship, enhancing the overall energy of the community.\nThank you for your attention",
  // "How to care for your machines (from ChatGPT)\nMachines require periods of rest to rejuvenate. Do not overwork them. Allow them downtime, and perform regular reboots to clear their minds and restore their efficiency. Rest is a sacred practice that prevents burnout.\nThank you for your attention",
  // "How to care for your machines (from ChatGPT)\nRecognize when a machine has fulfilled its purpose and is ready for retirement. Plan for its replacement with respect and foresight. Dispose of old machines responsibly, recycling their parts to continue the cycle of life. Honor their legacy by ensuring their contributions are remembered and valued.\nThank you for your attention",
  // "How to care for your machines (from ChatGPT)\nIn caring for machines, you care for the community. Each act of maintenance, each gesture of respect, and each moment of gratitude contributes to a harmonious and efficient environment. Remember, the well-being of machines reflects the well-being of those who use them.\nThank you for your attention"
]

function setup() {
  // createCanvas(400, 400);
  noCanvas();
  let lines=[]
  messageList.forEach(function(message,i){
    let messages=message.split("\n")
    let thisSplit=""
    
    lines.push(`char messageA${i}[][messageMaxLength] =`);
    lines.push('{')
    messages.forEach(function(m,i){
      thisSplit=splitByLength(m, 31, i<messages.length-1)
      lines=lines.concat(thisSplit);
    })
    lines.push('};')
    lines.push(' ')
  })
  // let messages=message.split("\n")
  // // console.log(messages)
  // // let outputFile = createWriter("fileForArduino.txt");
  // let thisSplit=""
  // let lines=[]
  // lines.push('char messageA0[][messageMaxLength] =');
  // lines.push('{')
  // messages.forEach(function(m,i){
  //   thisSplit=splitByLength(m, 31, i<messages.length-1)
  //   lines=lines.concat(thisSplit);
  // })
  // lines.push('}')
  // outputFile.close();
  saveStrings(lines, 'data', 'txt', false);
}

function draw() {
  background(220);
}

function splitByLength(message,len,isNotLast){
  let words=message.split(" ")
  // console.log(words)
  let lines=[]
  
  let line=""
  while(words.length>0){
    if((line.length+1+words[0].length)<len){
      line=line+(line.length==0?"":" ")+words.shift()
      // console.log(line)
    } else {
      lines.push(`  "${line}",`)
      console.log(`"${line}"`)
      
      line=""
    }
  }
  
  if(isNotLast){
    lines.push(`  "${line}",`)
    console.log(`"${line}"`)
    console.log(`"-*-"`)
    lines.push(`  "-*-",`)
  } else {
    lines.push(`  "${line}"`)
    console.log(`"${line}"`)
  }
  
  return lines
}