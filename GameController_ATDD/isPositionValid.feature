Feature: Positions Picking
  In order to avoid breaking the game
  As a Player (either computer or human)
  I am notified when position chosen is invalid

Scenario:
  When I select a position outside the game grid
  Then The result should be "false"

Scenario:
  When I select a position within the game grid
  Then The result should be "true"

