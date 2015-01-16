User.create!([
  {email: "guest@gmail.com", password_digest: "$2a$10$7D/vId82TtZNGLTmDukx/e2aDdioCYeL.rfXInJRofTrxhYJ7ZFKC", session_token: "sFMs_oQrZAubTFWQFPV1og"}
])
Board.create!([
  {title: "Welcome!", user_id: 1},
])
List.create!([
  {title: "Basics", board_id: 1, ord: 0.0},
  {title: "Features", board_id: 1, ord: 1.0},
  {title: "About", board_id: 1, ord: 2.0},
])
Card.create!([
  {title: "Welcome to Poieo!", list_id: 1, description: nil, ord: 0.0},
  {title: "This is a card.", list_id: 1, description: nil, ord: 1.0},
  {title: "Click on a card to see what's behind it.", list_id: 1, description: "You can leave additional information here.", ord: 2.0},
  {title: "Lists can be reordered by simply drag and dropping them.", list_id: 2, description: nil, ord: 0.0},
  {title: "Cards can also be moved to other lists.", list_id: 2, description: nil, ord: 1.0},
  {title: "Delete and editing lists and cards easily", list_id: 2, description: nil, ord: 2.0},
  {title: "Click on the logo on top to return to your boards.", list_id: 2, description: nil, ord: 3.0},
  {title: "For more information about me, click on this card.", list_id: 3, description: "www.linkedin.com/in/elinevandergaast/", ord: 0.0},
])


