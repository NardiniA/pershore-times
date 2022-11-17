export const getEmployers = async () => {
    const res = await fetch(`${process.env.STRAPI_ADMIN_URL}/api/employers?populate=deep`);
    const employers = await res.json();

    if (employers?.data) {
        const employs = employers?.data.map((e) => {
            const { Name, Slug, vacancies } = e?.attributes;
            return {
                name: Name,
                slug: Slug,
                vacancies: vacancies,
            };
        });

        return employs.sort();
    }
    return [];
}