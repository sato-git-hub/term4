const result = document.getElementById("result");
const checkBox = document.getElementById("cheatMode");
const buttons = document.querySelectorAll(".button-group button");
const body = document.body;
const win = [
  ["✊ グー", "✌️ チョキ"],
  ["✌️ チョキ", "🖐 パー"],
  ["🖐 パー", "✊ グー"],
];

checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    body.classList.add("cheat-active");
  } else {
    body.classList.remove("cheat-active");
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const userHand = event.target.textContent;
    //チートモードONの場合のcpuHand
    if (checkBox.checked) {
      const cpuHand = decideCpuHand(userHand);
      Text(userHand, cpuHand);
    } else {
      //cpuの手をランダムに決める
      const randomIndex = Math.floor(Math.random() * 3);
      const hand = ["✊ グー", "✌️ チョキ", "🖐 パー"];
      const cpuHand = hand[randomIndex];
      Text(userHand, cpuHand);
    }
  });
});

//チートモード時のcpuのhandを決定
function decideCpuHand(userHand) {
  for (let i = 0; i < win.length; i++) {
    if (userHand === win[i][0]) {
      return win[i][1];
    }
  }
}

function judgeWinner(userHand, cpuHand) {
  //戻り値 条件に合えばtrue 合わなければfalse
  return win.some((i) => {
    return i[0] === userHand && i[1] === cpuHand;
  });
}

//判定
function judge(userHand, cpuHand) {
  if (judgeWinner(userHand, cpuHand)) {
    result.classList.remove("draw", "lose");
    result.classList.add("win");
    return "勝ち";
  } else if (userHand === cpuHand) {
    result.classList.remove("win", "lose");
    result.classList.add("draw");
    return "あいこ";
  } else {
    result.classList.remove("draw", "win");
    result.classList.add("lose");
    return "負け";
  }
}

//画面表示テキスト
function Text(userHand, cpuHand) {
  const finalResult = judge(userHand, cpuHand);
  const cheatStatus = checkBox.checked ? " (チートON)" : "";
  result.innerHTML = `あなた:${userHand} 相手:${cpuHand} → ${finalResult}${cheatStatus}`;
}
