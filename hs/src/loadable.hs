data Loadable a = Idle | Loading | Success a | Failure deriving Show

instance Functor Loadable where
    fmap f Idle = Idle
    fmap f Loading = Loading
    fmap f (Success a) = Success (f a)
    fmap f Failure = Failure



data Todo = Todo { title :: String, status :: String  } deriving (Show) 

loadableTodos = Success [Todo {title = "Prepare Talk", status = "In Progress"}]

result = fmap (\todos -> 
    fmap (\todo -> 
        Todo {title = (title todo), status ="Completed"}) todos) loadableTodos

main = do  
    print result