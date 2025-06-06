class OrientadorDTO {
    constructor({ nome, email, expertise, lattes_link, bio }) {
        this.nome = nome;
        this.email = email;
        this.expertise = expertise;
        this.lattes_link = lattes_link;
        this.bio = bio;
    }
}

module.exports = OrientadorDTO;