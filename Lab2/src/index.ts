//1
async function helloAsync(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Hello Async"), 2000));
}

//2
async function getNumber(): Promise<number> {
  return new Promise((resolve) => setTimeout(() => resolve(10), 1000));
}

//3
function rejectPromise(): Promise<void> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Promise Rejected")), 1500);
  });
}
//4
const randomNumberPromise = new Promise<number>((resolve) => {
  const randomNum = Math.floor(Math.random() * 100);
  resolve(randomNum);
});
//5
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task completed in ${time} ms`), time);
  });
}
//6
async function promiseAllExample() {
  return Promise.all([simulateTask(500), simulateTask(1000), simulateTask(1500)]);
}
//7
async function promiseRaceExample() {
  return Promise.race([simulateTask(700), simulateTask(800), simulateTask(900)]);
}

//8
async function promiseChainExample() {
  return Promise.resolve(2)
    .then((num) => num * num)
    .then((num) => num * 2)
    .then((num) => num + 5);
}
//9
async function filterEvenNumbers() {
  const numberPromise = await new Promise<number[]>((resolve) => {
    setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000);
  });
  return numberPromise.filter((num) => num % 2 === 0);
}
//10
async function promiseFinallyExample() {
  return simulateTask(1000)
    .then((msg) => `First then: ${msg}`)
    .catch((err) => `Error: ${err}`)
    .finally(() => console.log("10. Finally called"));
}
// 11
async function helloAsyncAwait(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Hello Async (await)"), 2000)
  );
}
// 12
async function runSimulateTask() {
  return await simulateTask(2000);
}

// 13
async function errorHandler() {
  try {
    await rejectPromise();
  } catch (err) {
    return `Caught error: ${err}`;
  }
}
// 14
async function tripleAfter1Sec(num: number): Promise<number> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(num * 3), 1000)
  );
}
async function exercise14() {
  return await tripleAfter1Sec(5);
}
// 15
async function sequentialCalls() {
  const a = await tripleAfter1Sec(2);
  const b = await tripleAfter1Sec(3);
  return [a, b];
}

// 16
async function parallelCalls() {
  return Promise.all([
    tripleAfter1Sec(2),
    tripleAfter1Sec(3),
    tripleAfter1Sec(4),
  ]);
}
// 17
async function iteratePromises() {
  const promises = [1, 2, 3].map(tripleAfter1Sec);
  const results: number[] = [];
  for await (const result of promises) {
    results.push(result);
  }
  return results;
}

// 18
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: `User${id}` }), 1000)
  );
}
// 19
async function fetchUsers(ids: number[]) {
  return Promise.all(ids.map(fetchUser));
}
// 20
async function fetchUserWithTimeout(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), 2000);
    setTimeout(() => {
      clearTimeout(timer);
      resolve({ id, name: `User${id}` });
    }, 1500);
  });
}
// 21
async function fetchTodo() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
}
// 22
async function fetchMultipleTodos() {
  const ids = [1, 2, 3];
  return Promise.all(
    ids.map((id) =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((r) =>
        r.json()
      )
    )
  );
}
// 23
async function fetchCompletedTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: any[] = await res.json();
  return todos.filter((t) => t.completed);
}
// 24
async function postData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }),
  });
  return res.json();
}
// 25
function downloadFile(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("File tai xong");
    }, 3000)
  );
}
// 26
async function wait5Sec() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return "Doi 5 giay";
}
// 27
async function fetchWithRetry(url: string, retries: number): Promise<any> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Fetch loi");
      return await res.json();
    } catch (err) {
      if (i === retries) throw err;
    }
  }
}
// 28
async function batchProcess() {
  const tasks = Array.from({ length: 5 }, (_, i) =>
    simulateTask(1000 + i * 200)
  );
  return Promise.all(tasks);
}
// 29
async function queueProcess() {
  const tasks = Array.from({ length: 3 }, (_, i) => () =>
    simulateTask(1000 + i * 500)
  );
  const results: string[] = [];
  for (const task of tasks) {
    const res = await task();
    results.push(res);
  }
  return results;
}
// 30
async function multipleApiCalls() {
  const urls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
  ];
  return Promise.allSettled(
    urls.map((url) => fetch(url).then((res) => res.json()))
  );
}
async function demo() {
  console.log("Demo started");

  console.log("1.", await helloAsync());
  console.log("2.", await getNumber());
  try {
    await rejectPromise();
  } catch (error) {
    console.error("3. Caught error:", error);
  }
  console.log("4.", await randomNumberPromise);
  console.log("5.", await simulateTask(1200));
  console.log("6.", await promiseAllExample());
  console.log("7.", await promiseRaceExample());
  console.log("8.", await promiseChainExample());
  console.log("9.", await filterEvenNumbers());
  console.log("10.", await promiseFinallyExample());
  console.log("11.", await helloAsyncAwait());
  console.log("12.", await runSimulateTask());
  console.log("13.", await errorHandler());
  console.log("14.", await exercise14());
  console.log("15.", await sequentialCalls());
  console.log("16.", await parallelCalls());
  console.log("17.", await iteratePromises());
  console.log("18.", await fetchUser(1));
  console.log("19.", await fetchUsers([1, 2, 3]));
  console.log("20.", await fetchUserWithTimeout(5));
  console.log("21.", await fetchTodo());
  console.log("22.", await fetchMultipleTodos());
  console.log("23.", (await fetchCompletedTodos()).slice(0, 5));
  console.log("24.", await postData());
  console.log("25.", await downloadFile());
  console.log("26.", await wait5Sec());
  console.log("27.", await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 2));
  console.log("28.", await batchProcess());
  console.log("29.", await queueProcess());
  console.log("30.", await multipleApiCalls());

  console.log("Demo ended");
}

