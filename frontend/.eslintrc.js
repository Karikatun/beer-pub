module.exports = {
    env: {
      browser: true,
      es2021: true,
      jest: true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb/hooks',
      'airbnb-typescript',
      'prettier',
      'airbnb',
      'plugin:i18next/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        modules: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json'
    },
    plugins: [
      'prettier', 'react', '@typescript-eslint', 'i18next'
    ],
    rules: {
      semi: 1, // предупреждает о необходимости ; в конце оператора
      'eol-last': 'error', // необходимость пустой строки в конце файла
      'no-unsafe-optional-chaining': 0, // отключение правила ?.
      'no-nonoctal-decimal-escape': 0, // отключает правило, запрещающее \8 и \9 escape-последовательности в строковых литералах
      'no-param-reassign': [1, { props: false }], // предупреждает о переназначении параметром
      'array-callback-return': [2, { checkForEach: false }], // запрещает принудительные return операторы в обратных вызовах методов массива, для forEach разрешено 
      'import/order': [2, { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'] }], // устанавливает порядок импортов в соответствии с groups
      'sort-imports': ['error', { ignoreCase: true, allowSeparatedGroups: true }], // устанавливает порядок импорта модулей, игнорирует регистр, пустая строка, строка комментария или строка с любым другим оператором после оператора декларации импорта сбросит сортировку
      'jsx-quotes': [1, 'prefer-single'], // предупреждает о последовательном использовании двойных или одинарных кавычек в атрибутах JSX, принудительное использование одинарных кавычек
      'max-len': ['error', { code: 130 }], // запрет использования более 130 символов в строке
      'default-case': 0, // отключает правило, обязывающее устанавливать default case в switch (правило не требуется, если используется typescript)
      'import/extensions': [1, { extensions: ['.jsx', '.tsx', '.ts', '.js', '.svg', '.json'] }], // предупреждает об использовании расширений в импортах
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx', '.ts', '.js'] }], // предупреждает о расширениях файлов, которые могут содержать JSX, разрешен массив extensions
      'import/no-unresolved': 0, // отключает правило, разрешающее только импорт ES6
      'import/prefer-default-export': 0, // отключает правило, при котором единственный экспорт из модуля должен быть по умолчанию
      'no-use-before-define': 0, // отключает правило, запрещающее использование переменных до их определения
      '@typescript-eslint/no-use-before-define': 0, // отключает правило, запрещающее использование переменных до их определения с поддержкой type и interface
      'no-useless-return': 0, // отключает правило, запрещающее избыточные операторы возврата
      'react/function-component-definition': [2, { namedComponents: 'arrow-function' }], // использование только стрелочных функций для именованных компонентов
      'react/display-name': 0, // отключает правило, требующее displayName в определении компонента React
      'react/require-default-props': 0, // отключает правило, требующее чтобы типы свойств компонента имели соответствующее defaultProps значение
      'react/jsx-boolean-value': 0, // отключает правило, требующее чтобы при использовании логического атрибута в JSX устанавливалось значение атрибута true
      'react/jsx-no-duplicate-props': 2, // запрет использования повторяющихся свойств в JSX
      'react/jsx-no-undef': 1, // предупреждает об использовании необъявленных переменных в JSX
      'no-bitwise': 0, // отключает правило, запрещающее использование побитовых операторов
      'no-console': 1, // предупреждает об использовании console
      'consistent-return': 0, // отключает правило, требующее возврат значения в каждой функции (правило не требуется, если используется typescript)
      'no-underscore-dangle': 0, // отключает правило, запрещающее висячие символы подчеркивания в идентификаторах
      'react/jsx-sort-props': 0, // отключает правило сортировки props по алфавиту
      'react/jsx-uses-react': 1, // предупреждает о неиспользовании React
      'react/jsx-uses-vars': 1, // предупреждает об обявлении переменных, которые нигде не используются
      'react/no-did-mount-set-state': 1, // предупреждает об использовании setState в componentDidMount
      'react/no-did-update-set-state': 1, // предупреждает об использовании setState в componentDidUpdate
      'react/no-multi-comp': 0, // отключает правило, запрещающее несколько определений компонентов в файле
      'react/no-string-refs': 1, // предупреждает об использовании строковых ссылок
      'react/no-unknown-property': 0, // отключает правило, запрещающее использование неизвестного свойства DOM
      'react/jsx-first-prop-new-line': [2, 'never'], // первое свойство никогда не должно размещаться на новой строке
      'object-curly-spacing': ['error', 'always'], // требует пробела внутри фигурных скобок (кроме {})
      'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never', // ошибка когда пробел разделяет два символа в токенах JSX </ и />
        beforeSelfClosing: 'always', // ошибка когда перед закрывающей скобкой отсутствует пробел
        afterOpening: 'never', // ошибка когда после открывающей скобки открывающего или закрывающего элемента JSX присутствует пробел
        beforeClosing: 'never' // ошибка когда перед закрывающей скобкой открывающего или закрывающего элемента JSX присутствует пробел
      }],
      'react/prop-types': 0, // отключает правило, требующее проверки отсутствующих props в определении компонента React
      'react/react-in-jsx-scope': 1, // предупреждает об отсутствии React при использовании JSX
      'react/self-closing-comp': 1, // предупреждает об использовании лишних закрывающих тегов для компонентов без дочерних элементов
      'react/wrap-multilines': 0, // отключает правило, требующее заключение многострочного кода JSX в круглые скобки
      'react-hooks/exhaustive-deps': 'off', // отключает правило проверки зависимостей пользовательских хуков
      'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }], // правило, требующее использования скобок только там, где они нужны, необходимость круглых скобок, если тело функции находится в блоке инструкций (окруженном фигурными скобками)
      'no-plusplus': [1, { allowForLoopAfterthoughts: true }], // предупреждает об использовании унарных операторов ++ и --, позволяет использовать унарные операторы ++ и -- в конце цикла
      'jsx-a11y/label-has-associated-control': [2, { required: { some: ['nesting', 'id'] } }], // правило требует чтобы у тега label была текстовая метка и связанный элемент управления
      'jsx-a11y/click-events-have-key-events': 0, // отключает правило, требующее при использовании onClick использовать onKeyUp, onKeyDown или onKeyPress
      'jsx-a11y/no-static-element-interactions': 0, // отключает правило, требующее при использовании статического элемента присваивать ему роль 
      'react/jsx-one-expression-per-line': [0, { allow: 'none' | 'literal' | 'single-child' }], // отключает правило, требующее один элемент JSX на строку 
      'react/jsx-closing-bracket-location': [1, { selfClosing: 'after-props', nonEmpty: 'after-props' }], // предупреждает о расположении закрывающей скобки для многострочных элементов JSX
      'react/jsx-indent-props': [2, 'first'], // требует выравнивания props по отступу первого props
      'react/jsx-props-no-multi-spaces': 1, // предупреждает об использовании нескольких пробелов между props
      'object-curly-newline': [1, {
        ObjectExpression: { multiline: true, minProperties: 4 }, // конфигурация литералов объектов
        ObjectPattern: { multiline: true }, // конфигурация для шаблонов объектов деструктурирующих назначений
        ImportDeclaration: 'never', // конфигурация для именованного импорта
        ExportDeclaration: { multiline: true, minProperties: 2 } // конфигурация для именованного экспорта
      }], // предупреждает о необходимоси применения согласованных разрывов строк после открытия и перед закрытием фигурных скобок
      'react/jsx-props-no-spreading': [0], // разрешает о ...props
      quotes: [
        2,
        'single',
        'avoid-escape'
      ], // правило требующее использования одинарных кавычек везде, где это возможно, позволяет использовать в строках одинарные или двойные кавычки, если строка содержит кавычки, которые в противном случае пришлось бы экранировать
      '@typescript-eslint/no-var-requires': 0, // отключает правило, запрещающее использование var .. = require('..')
      'keyword-spacing': [2, { before: true, after: true }], // необходимость постоянства интервала до и после ключевых слов
      'function-paren-newline': ['error', 'consistent'], // требует последовательного использования разрывов строки для каждой пары скобок
      'comma-dangle': ['error', 'never'], // запрещает запятые в конце
      '@typescript-eslint/comma-dangle': ['error', 'never'], // запрещает запятые в конце с поддержкой синтаксиса TypeScript
      'operator-linebreak': ['error', 'after'], // требует переноса строки после оператора
      'linebreak-style': 0, // отключает правило применения согласованного стиля разрыва строки
      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          'allowSingleExtends': true
        }
      ], // отключает предупреждения о расширении одного интерфейса без добавления дополнительных членов
      'import/no-extraneous-dependencies': ['error', {'devDependencies': ['**/tests/**/*']}], // отключает правило, запрещающее использование devDependencies в jest
      '@typescript-eslint/no-namespace': 0, // отключает правило, запрещающее использование namespace 
      '@typescript-eslint/indent': 0, // отключает правило, требующие писать обобщенный тип в одну строку
      'no-shadow': 0, // отключает правило переопределения переменных внутри области видимости. Необходимо отключить для правильной работы аналогичного правила для ts
      '@typescript-eslint/no-shadow': 2, // предупреждает о переопределении переменных внутри области видимости для ts
      'react/react-in-jsx-scope': 'off',
       // allow jsx syntax in js files (for next.js project)
      'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }], 
      'no-unused-vars': 'warn',
      'import/no-extraneous-dependencies': 'warn',
      '@typescript-eslint/naming-convention': 'warn',
      'i18next/no-literal-string': ['error', { markupOnly: true, onlyAttribute: [""] }]
    },
  
    globals: {
      '__IS_DEV__': true,
      'ENABLE_AI_IMAGES': true,
    },
  
    ignorePatterns: ['babel.config.js', 'jest.config.ts', 'webpack.config.ts', '.eslintrc.js', 'build/*'],
    overrides: [
      {
        files: ['**/src/**/*.test.{ts,tsx}'],
        rules: {
          'i18next/no-literal-string': 'off'
        }
      }
    ]
  };
  