const { Op, where } = require("sequelize");
const {
  sequelize,
  Book,
  Rent,
  RentBook,
  History,
  Student,
  Section,
} = require("../models");

class Controller {
  static async getBook(req, res, next) {
    try {
      const { page, filter, title } = req.query;

      const options = {
        limit: 5,
        offset: (Number(page) - 1) * 5,
        where: {
          stock: { [Op.gt]: 0 },
        },
        order: [["id", "ASC"]],
      };

      if (title !== "") {
        options.where.title = { [Op.like]: `%${title}%` };
      }

      if (filter) {
        options.where.sectionId = filter;
      }
      const data = await Book.findAll(options);

      const totalItem = await Book.count({ where: options.where });

      const totalPage = Math.ceil(totalItem / 5);
      res.status(200).json({
        status: true,
        message: "Successfully retrieved books list",
        statusCode: "OK",
        data,
        totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createBook(req, res, next) {
    try {
      const { title, author, sectionId, stock } = req.body;
      await Book.create({ title, author, sectionId, stock });
      res.status(201).json({
        status: true,
        message: "Successfully create book",
        statusCode: "Created",
      });
    } catch (error) {
      next(error);
    }
  }

  static async rentBook(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { studentId, books } = req.body;
      const newRent = await Rent.create({ studentId }, { transaction: t });

      await Promise.all(
        books.map(async (e) => {
          await RentBook.create(
            { rentId: newRent.dataValues.id, bookId: e },
            { transaction: t }
          );
          const getBook = await Book.findByPk(e);
          await Book.update(
            { stock: getBook.stock - 1 },
            { where: { id: e } },
            { transaction: t }
          );
        })
      );

      await t.commit();
      res.status(201).json({
        status: true,
        message: "Successfully rent books",
        statusCode: "Created",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async getRent(req, res, next) {
    try {
      const { studentid } = req.headers;
      let data;
      if (studentid) {
        data = await Rent.findAll({
          where: { status: true, studentId: studentid },
          include: {
            model: RentBook,
            include: {
              model: Book,
            },
          },
        });
      } else {
        data = await Rent.findAll({
          where: { status: true },
          include: {
            model: RentBook,
            include: {
              model: Book,
            },
          },
        });
      }

      res.status(200).json({
        status: true,
        message: "Successfully retrieved rent list",
        statusCode: "OK",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async doneRent(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const rent = await Rent.findByPk(id, {
        include: {
          model: RentBook,
          include: {
            model: Book,
          },
        },
      });

      const rentData = rent.toJSON();
      const books = rentData.RentBooks;

      await Rent.update({ status: false }, { where: { id }, transaction: t });

      await Promise.all(
        books.map(async (e) => {
          const getBook = await Book.findByPk(e.bookId);
          await Book.update(
            { stock: getBook.stock + 1 },
            { where: { id: getBook.id }, transaction: t }
          );
          await History.create(
            {
              studentId: rent.studentId,
              bookId: getBook.id,
              rentDate: rent.rentDate,
              returnDate: new Date(),
            },
            { transaction: t }
          );
        })
      );

      await t.commit();
      res.status(200).json({
        status: true,
        message: "Successfully done rent",
        statusCode: "OK",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async createStudent(req, res, next) {
    try {
      const { name, studentid } = req.body;

      await Student.create({ name, studentid });

      res.status(201).json({
        status: true,
        message: "Successfully create student",
        statusCode: "Created",
      });
    } catch (error) {
      next(error);
    }
  }

  static async increaseStock(req, res, next) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);

      if (!book) {
        throw { name: "NotFound" };
      }

      await Book.update({ stock: book.stock + 1 }, { where: { id } });

      res.status(200).json({
        status: true,
        message: "Successfully increase book",
        statusCode: "Updated",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStudent(req, res, next) {
    try {
      const { status } = req.headers;
      const options = {
        order: [["id", "ASC"]],
      };

      if (status == "student") {
        options.where = { status: true };
      }

      const data = await Student.findAll(options);

      res.status(200).json({
        status: true,
        message: "Successfully retrieved student list",
        statusCode: "OK",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSection(req, res, next) {
    try {
      const data = await Section.findAll();

      res.status(200).json({
        status: true,
        message: "Successfully retrieved section list",
        statusCode: "OK",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getHistory(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const limit = 7;
      const offset = (Number(page) - 1) * limit;

      const options = {
        limit,
        offset,
        include: [
          {
            model: Book,
            as: "Book",
          },
          {
            model: Student,
            as: "Student",
          },
        ],
      };

      const data = await History.findAll(options);

      const totalItem = await History.count();
      const totalPage = Math.ceil(totalItem / limit);

      res.status(200).json({
        status: true,
        message: "Successfully retrieved history list",
        statusCode: "OK",
        data,
        totalPage,
      });
    } catch (error) {
      next(error);
    }
  }
  static async createSection(req, res, next) {
    try {
      const { name } = req.body;

      await Section.create({ name });

      res.status(201).json({
        status: true,
        message: "Successfully create section",
        statusCode: "Created",
      });
    } catch (error) {
      next(error);
    }
  }
  static async changeStatus(req, res, next) {
    try {
      const { id } = req.params;

      const valStudent = await Student.findByPk(id);
      if (!valStudent) {
        throw {
          name: "NotFound",
        };
      }
      if (valStudent.status) {
        await Student.update({ status: false }, { where: { id } });
      } else {
        await Student.update({ status: true }, { where: { id } });
      }

      res.status(200).json({
        status: true,
        message: "Successfully change status",
        statusCode: "Updated",
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;
