class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json(:include => {
                    :trainer => {:only => [:name]},
                  }, :except => [:updated_at, :created_at])
              end
      
      

      def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon.to_json(:include => {
            :trainer => {:only => [:name]},
          }, :except => [:updated_at, :created_at])
      end

      def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        
        render json: pokemon 
      end 

      def destroy
          pokemon = Pokemon.find_by(id: params[:id])
          pokemon.destroy

          render json: pokemon
      end 

    #   private

    #   def pokemon_params
    #     params.require(:pokemon).permit(:trainer_id)
    #   end 
    
    
end
