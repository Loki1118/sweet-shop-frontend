# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

Screenshots

<img width="1281" height="710" alt="Screenshot 2025-09-20 200650" src="https://github.com/user-attachments/assets/984ddc3e-f3ac-4400-8266-6660c4bed295" />
<img width="1919" height="1077" alt="Screenshot 2025-09-20 200906" src="https://github.com/user-attachments/assets/195674ac-1c61-4136-bba0-8aa292918f5f" />
<img width="1918" height="1073" alt="Screenshot 2025-09-20 200819" src="https://github.com/user-attachments/assets/3f776098-1897-4dae-8317-9b7e57bd45f8" />
<img width="1919" height="1081" alt="Screenshot 2025-09-20 200707" src="https://github.com/user-attachments/assets/5be381b2-00be-4424-8916-b46658120879" />
<img width="1919" height="1078" alt="Screenshot 2025-09-20 200806" src="https://github.com/user-attachments/assets/f03380c4-ae8d-4d53-8837-b4cb8b6ae184" />
<img width="1918" height="1082" alt="Screenshot 2025-09-20 200751" src="https://github.com/user-attachments/assets/90ff89fa-dfab-4443-9894-5083db878b28" />





🚀 My AI Usage

I used AI tools responsibly to accelerate development and maintain good coding practices. Below is a breakdown of how I leveraged them:

🔧 Tools Used

ChatGPT (GPT-5, OpenAI)

GitHub Copilot

Cursor

💡 How I Used Them
🖥️ Backend Development

Generated Express.js boilerplate (routes, middleware, Mongoose models) with ChatGPT.

Debugged JWT authentication & cookie handling issues via ChatGPT.

Verified MongoDB connection/config errors with ChatGPT.

Copilot suggested async/await error-handling snippets while writing controllers.

Cursor helped scaffold files and navigate backend modules efficiently.

🎨 Frontend Development

Used ChatGPT to scaffold React + Vite + Tailwind setup.

Fixed Tailwind/PostCSS build issues with ChatGPT guidance.

Generated reusable React components (Login, Register, Dashboard) & JWT auth context with ChatGPT.

Cursor assisted in writing TypeScript types and API call integrations.

🧪 Testing & TDD

ChatGPT outlined Jest test cases for controllers & middleware.

Copilot generated test stubs, refined manually.

Cursor streamlined test file navigation & repetitive setup refactoring.

📑 Documentation & Git

ChatGPT drafted structured commit messages with Co-authored-by notes.

ChatGPT helped write this AI Usage section.

Cursor enabled quick README navigation and content updates.

🧭 Reflection on AI Impact

AI tools boosted my productivity by:

⚡ Speeding up repetitive tasks (boilerplate, config, types).

🐞 Helping debug errors faster (JWT cookies, Tailwind builds).

🤝 Acting as a coding partner — offering ideas while I made final decisions.

🏗️ Freeing time to focus on architecture & clean code.

🔍 Enhancing workflow efficiency (Cursor for refactoring & navigation).

👉 Importantly, I never blindly accepted AI suggestions. Every piece of code was reviewed, tested, and refactored. I treat AI as a collaborator, not a replacement for engineering judgment.
