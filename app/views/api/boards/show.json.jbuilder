# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list


json.(@board, :title, :created_at, :updated_at, :id)

json.lists @board.lists do |list|
	json.(list, :title, :ord, :updated_at, :id)
		json.cards list.cards do |card| 
			json.(card, :title, :list_id, :description, :ord, :created_at, :id)
		end
end
