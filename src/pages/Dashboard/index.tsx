import Header from '../../components/Header'; 
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles'; 
import FoodFactory, { FoodType } from '../../factories/food';

const Dashboard = () => { 
  const { 
    foods, 
    handleAddFood, 
    modalOpen, 
    toggleModal, 
    handleDeleteFood, 
    editingFood,
    editModalOpen, 
    handleUpdateFood, 
    toggleEditModal, 
    handleEditFood
  } = FoodFactory() 

  return ( 
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      /> 
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food: FoodType) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
} 

export default Dashboard;
