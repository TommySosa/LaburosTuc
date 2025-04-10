import { format } from 'date-fns'
import { es } from 'date-fns/locale/es';

export function formatDate(createdAt) {
    const createdAtDate = createdAt.toDate();
    const now = new Date();

    const diffInMinutes = Math.floor((now - createdAtDate) / (1000 * 60));

    let formattedDate;
    if (diffInMinutes < 60) {
        formattedDate = `Hace ${diffInMinutes} minutos`;
    } else if (diffInMinutes < 1440 && createdAtDate.getDate() === now.getDate() - 1) {
        const hours = createdAtDate.getHours();
        const minutes = createdAtDate.getMinutes();
        formattedDate = `Ayer a las ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else {
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            formattedDate = `Hace ${diffInHours} horas`;
            if (diffInHours === 1) {
                formattedDate = `Hace ${diffInHours} hora`;
            }
        } else {
            formattedDate = format(createdAtDate, "'El 'EEEE dd 'a las' HH:mm", { locale: es });
        }
    }

    return formattedDate;
}