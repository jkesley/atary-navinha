# 👾 Navinha Atari – Arcade Game em JavaScript

Jogo arcade inspirado nos clássicos do Atari, desenvolvido com **HTML5 Canvas, CSS e JavaScript puro**, focado em lógica de jogos, colisões, progressão de dificuldade e persistência de dados no navegador.

🔗 **Demo online:** [https://jkeslei.github.io/](https://jkesley.github.io/atary-navinha/)

---

## 🎮 Sobre o Jogo

O **Navinha Atari** é um jogo 2D onde o jogador controla uma nave espacial usando o **movimento do mouse**, enfrentando ondas infinitas de alienígenas que:
- Se movimentam de forma dinâmica
- Atiram de volta no jogador
- Aumentam a dificuldade progressivamente

O objetivo é obter a **maior pontuação possível**, registrando o recorde com suas iniciais.

---

## 🕹️ Controles

| Ação | Comando |
|----|----|
| Mover nave | Movimento do mouse |
| Atirar | Clique do mouse |

---

## 🚀 Funcionalidades

✔ Movimento da nave via mouse  
✔ Tiros do jogador e dos inimigos  
✔ Inimigos infinitos  
✔ Sistema de pontuação  
✔ Aumento de dificuldade a cada **500 pontos**  
✔ Movimentos e ataques inimigos mais rápidos e aleatórios  
✔ Tela de **Game Over**  
✔ Registro de **recorde com iniciais do jogador**  
✔ Persistência de dados usando `localStorage`  
✔ Interface retrô inspirada em arcades clássicos  

---

## 🧠 Conceitos Técnicos Aplicados

- Game Loop com `requestAnimationFrame`
- Programação orientada a eventos
- Detecção de colisão (bounding box)
- Manipulação do DOM
- Persistência local (`localStorage`)
- Canvas API
- Controle de estado do jogo
- Progressão dinâmica de dificuldade

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Canvas API**

---

## 📂 Estrutura do Projeto

```bash
📁 navinha-atari
├── index.html
├── style.css
├── game.js
├── README.md
└── img/
    ├── nave.png
    └── alien.png
