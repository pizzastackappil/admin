import { Create, NumberInput, SimpleForm, TextInput } from 'react-admin';
import { CloudinaryInput } from '../../../../common/components/cloudinary-input/cloudinary-input.component';

export const MenuCreate = () => (
    <Create title={'Додати елемент меню'}>
        <SimpleForm>
        <TextInput source="title" fullWidth label='Назва'/>
        <CloudinaryInput source="image" label="Фото"/>
      <TextInput source="ingredients" fullWidth label='Інгридієнти' />
      <NumberInput source="price" label='Ціна в грн'/>
      <NumberInput source="weight" label='Вага в гр.' />
        </SimpleForm>
    </Create>
);