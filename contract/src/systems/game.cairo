// Interface definition
#[starknet::interface]
pub trait IGame<T> {
    // --------- Core gameplay methods ---------
    fn spawn_player(ref self: T);
    fn train(ref self: T);
    fn mine(ref self: T);
    fn rest(ref self: T);
}

#[dojo::contract]
pub mod game {
    // Local import
    use super::{IGame};

    // Store import
    use full_starter_react::store::{StoreTrait};

    // Constant import
    use full_starter_react::constants;

    // Models import
    use full_starter_react::models::player::{PlayerAssert};

    // Dojo Imports
    #[allow(unused_imports)]
    use dojo::model::{ModelStorage};
    #[allow(unused_imports)]
    use dojo::world::{WorldStorage, WorldStorageTrait};
    #[allow(unused_imports)]
    use dojo::event::EventStorage;

    use starknet::{get_block_timestamp};

    #[storage]
    struct Storage {}

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    // Constructor
    fn dojo_init(ref self: ContractState) {}

    // Implementation of the interface methods
    #[abi(embed_v0)]
    impl GameImpl of IGame<ContractState> {
        
        // Method to create a new player
        fn spawn_player(ref self: ContractState) {
            let mut world = self.world(@"full_starter_react");
            let store = StoreTrait::new(world);

            // Create new player
            store.create_player();
        }

        // Method to train player (+10 experience)
        fn train(ref self: ContractState) {
            let mut world = self.world(@"full_starter_react");
            let store = StoreTrait::new(world);
            let player = store.read_player();

            // Train player
            store.train_player();
        }

        // Method to mine coins (+5 coins, -5 health)
        fn mine(ref self: ContractState) {
            let mut world = self.world(@"full_starter_react");
            let store = StoreTrait::new(world);

            let player = store.read_player();
           
            // Mine coins
            store.mine_coins();
        }

        // Method to rest player (+20 health)
        fn rest(ref self: ContractState) {
            let mut world = self.world(@"full_starter_react");
            let store = StoreTrait::new(world);

            let player = store.read_player();

            // Rest player
            store.rest_player();
        }

    }
}