# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list


json.(@board, :title, :created_at, :updated_at)

json.lists @board.lists do |list|
	json.(list, :title, :ord, :updated_at)
		json.cards list.cards do |card| 
			json.(card, :title, :list_id, :description, :ord, :created_at)
		end
end
