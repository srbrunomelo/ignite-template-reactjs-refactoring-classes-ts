import { useEffect, useState } from "react"
import api from "../services/api"

export type FoodType = {
  available: boolean
  description: string
  id: number
  image: string
  name: string
  price: string
}

type FormDataType = {
  description?: string
  image?: string
  name?: string
  price?: string
}
 
function FoodFactory() { 
  const [foods, setFoods] = useState<FoodType[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editingFood, setEditingFood] = useState<FoodType | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => { 
    const getFoods = async () => {
      const { data } = await api.get('/foods')
 
      setFoods(data)
    }
    getFoods()
  }, [])

  const toggleModal = () => setModalOpen(!modalOpen)

  const handleAddFood = async (food: FormDataType) => {  
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
  
      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {  
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const handleUpdateFood = async (food: FoodType) => {
    try {   
      const foodUpdated = await api.put(`/foods/${editingFood?.id}`, { ...editingFood, ...food });

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated) 
    } catch (err) {
      console.log(err);
    }
  }
 
  const toggleEditModal = () => setEditModalOpen(!editModalOpen)

  const handleEditFood = (food: FoodType) => {  
    setEditingFood(food)
    setEditModalOpen(true) 
  }
  
  return {
    foods, 
    handleAddFood, 
    modalOpen, 
    setModalOpen, 
    toggleModal, 
    handleDeleteFood, 
    editingFood, 
    setEditingFood,
    editModalOpen, 
    setEditModalOpen, 
    handleUpdateFood, 
    toggleEditModal, 
    handleEditFood
  }
}

export default FoodFactory