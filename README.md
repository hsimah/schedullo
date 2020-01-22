# schedullo
Schedullo is a Trello power up designed to make a simple and reusable weekly planner.

The idea is users would create a list of weekly tasks (wash sheets, take out garbage/recycling bin) with a day and time. The power up will take these cards and copy them to a disposable daily list and sort by scheduled completion time.

This project is currently at MVP stage. Lists and cards are not sorted correctly and board population is done via a button in Trello.

Schedullo requires Custom Fields to be enabled on the Trello board.

### Planned features
- Slack integration
 - send reminders via Slack
 - create tasks via Slack command
- Automated population of board at scheduled time (using node cron)
- Settings screens to allow configuration of Schedullo from Trello
