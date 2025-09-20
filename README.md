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



**My AI Usage**

For this project, I used AI tools responsibly to accelerate development and maintain good coding practices. Below is a breakdown of how I leveraged them:

**🔧 Tools Used**

ChatGPT (GPT-5, OpenAI)

GitHub Copilot

Cursor

**💡 How I Used Them**

**Backend Development:**

Asked ChatGPT for boilerplate code for Express.js routes, middleware, and Mongoose models.

Used ChatGPT to debug JWT authentication and cookie handling issues.

Verified MongoDB connection errors and configuration with ChatGPT.

Copilot suggested snippets while writing controllers (e.g., async/await error handling patterns).

Used Cursor interactively in the code editor to quickly scaffold files and navigate between backend modules efficiently.

**Frontend Development:**

Used ChatGPT to scaffold React + Vite + Tailwind project setup.

Requested guidance on fixing Tailwind/PostCSS issues during build.

Asked ChatGPT to generate reusable React components (Login, Register, Dashboard) and context setup for JWT auth.

Cursor assisted in writing repetitive TypeScript types and connecting API calls seamlessly.

**Testing & TDD:**

Asked ChatGPT to outline Jest test cases for controllers and middleware.

Used Copilot to quickly generate test stubs, then refined them manually.

Cursor helped navigate test files and refactor repetitive test setups efficiently.

Documentation & Git:

ChatGPT helped draft structured commit messages with Co-authored-by notes.

Used ChatGPT to generate this "My AI Usage" section.

Cursor was used to quickly jump between README sections and update content.

**🧭 Reflection on AI Impact**

AI tools significantly improved my productivity by:

Speeding up repetitive coding tasks (boilerplate, config setup, types).

Helping me debug errors faster (especially with JWT cookies and Tailwind build issues).

Acting as a coding partner — giving me ideas, but leaving final decisions to me.

Allowing me to focus more on architecture and clean code, rather than syntax errors.

Cursor specifically enhanced workflow efficiency in navigating and refactoring large code files.

I was careful not to blindly accept AI suggestions. Every piece of code was reviewed, tested, and refactored where necessary. I see AI as a collaborator, not a replacement for my engineering judgment.
