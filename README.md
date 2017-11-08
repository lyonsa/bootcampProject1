<h1 align="center">Trivia</h1>

## Team
- [Allen Lyons](https://github.com/lyonsa)
- [Kane Price](https://github.com/pricekane)
- [Charles Kenney](https://github.com/charliekenney23)

## Description
A competitive multiplayer quiz app where users compete to become the best. Users login with facebook and play against one another. Users get scores based on their victories and losses and answering questions correctly.

## APIs/Technologies
- [Firebase](https://firebase.google.com/docs/)
- [Firebase Auth](https://firebase.google.com/docs/auth/)
- [Facebook Login](https://developers.facebook.com/docs/facebook-login/)
- [Open Trivia Database](https://opentdb.com/api_config.php)
- [React.js](https://reactjs.org/docs/hello-world.html)

## Tasks
- [ ] Setup Routes
  - [ ] Home
  - [ ] Game
  - [ ] Leaderboard
  - [ ] Login
  - [ ] Profile
- [ ] Setup Authentication (0Auth)
- [x] Setup Project Directory and Branches on Github
- [ ] UI Components
  - [ ] User
  - [ ] Question
  - [ ] Answer
  - [ ] Header
- [ ] OPTIONAL Mobile Functionality
- [ ] OPTIONAL Lifelines/Powerups

## Game Logic
- Homepage
  - Shows users waiting (0/2, 1/2)
  - Shows start button
  - Has banner
- Waiting Screen
  - User has to wait if there is no other user
  - Fun waiting icon that indicates still connected and looking???
- Pick Category Screen
  - Shows buttons for the categories (random selected player needs to pick one)
  - User attributes show
    - Name
    - Profile picture
    - Scores for round and forever -”({foreverScore (roundScore)}"
  - Nice to have: when the selecting user hovers over a category, the other user can see that (think stage selection in fighting game)
- In Game
  - User attributes maintain position
    - Question is shown with four options
  - (Make sure that users cannot see each others hover now)
  - On selection:
    - First user
      - Immediately display if correct/incorrect
        - Div turns red/green
        - Displays "Correct/Incorrect"
      - Countdown for time remaining moves to 3 when the 2nd user selects
    - Second user
      - immediately display if correct/incorrect
      - countdown for time also sets to 3 so they have time to see the correct/incorrect option
  - Note: We don't need a "correct/incorrect" phase outside of the questions with this flow
- After Questions
  - 30 second timer until kicking users back to the start if no selection below
  - Shows winner with score (big and center)
  - Shows loser with score (below like a loser)
  - Again button
    - If selected by both, both users are kicked to the category screen and the user picks
    - If only one selects place them back in the waiting area
  - Main menu button
    - kicks both users back to the home screen

## Mockup

<p align="center">
  <img src="assets/images/mockup.jpg">
</p>
