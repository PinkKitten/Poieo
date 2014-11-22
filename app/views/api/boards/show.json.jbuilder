# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list


json.(@board, :title, :created_at, :updated_at)

json.lists @board.lists, :title, :ord, :created_at
