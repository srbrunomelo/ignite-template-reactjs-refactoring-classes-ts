export type FormDataType = {
  description?: string
  image?: string
  name?: string
  price?: string
}

export type ModalAddFoodProps = {
  isOpen: boolean
  setIsOpen: () => void
  handleAddFood: (data: FormDataType) => void
}