export const getVacancies = async () => {
    const res = await fetch(`${process.env.STRAPI_ADMIN_URL}/api/vacancies?populate=deep`);
    const vacancies = await res.json();

    if (vacancies?.data) {
        return vacancies?.data.map((vacancy) => ({
            slug: vacancy?.attributes.Slug,
            title: vacancy?.attributes.Title,
            employer: vacancy?.attributes?.employer,
            content: vacancy?.attributes.Content,
            applicationDestination: vacancy?.attributes.ApplicationDestination,
            tags: vacancy?.attributes?.tags,
        }));
    }
    return [];
}