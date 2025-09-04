# 🧵 React Web Worker Performance Test

This React project demonstrates the performance difference between running a heavy loop on the **main thread** vs using a **Web Worker** to offload the work to a separate thread — keeping the UI responsive.

## 🚀 How to Use

1. **Enter a Number**  
   Input how many times the loop should run.

2. **Start the Test**  
   Click a button to run the loop:
   - **Without Web Worker** – runs the loop on the main thread.
   - **With Web Worker** – runs the loop in a separate thread.

3. **Click a User Item**  
   Click on any user item in the list. Its text will change immediately **only if the UI is still responsive**.

   - ❌ **Without Web Worker**: Main thread is busy, so UI freezes, and text updates are delayed.
   - ✅ **With Web Worker**: Main thread is free, so UI updates happen instantly.

## 💡 Why This Matters

In real-world apps, blocking the main thread (e.g., with heavy calculations or loops) causes the UI to become unresponsive. **Web Workers** solve this by offloading the heavy tasks to a background thread.

---

## 🧱 Tech Stack

- React (with Hooks)
- JavaScript
- Web Workers API
- CSS (for basic styling)

---

## 🧪 Example Use Case

This is a great example for:

- Teaching the difference between sync and async behavior in React
- Demonstrating Web Worker integration in a React app
- Showing how to keep the UI responsive under load

---

## 🛠️ Setup & Run

```bash
# Install dependencies
npm install

# Start the development server
npm start

```

---

- A link to a live demo ([web-worker-Example-live](https://web-worker-example.surge.sh/))
