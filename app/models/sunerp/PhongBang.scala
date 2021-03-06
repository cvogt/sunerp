package models.sunerp

import models.core.{AbstractQuery, AbstractTable, WithId}
import play.api.db.slick.Config.driver.simple._
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import dtos.{PhongBangDto, ExtGirdDto, PagingDto}

/**
 * The Class PhongBang.
 *
 * @author Nguyen Duc Dung
 * @since 3/4/14 9:20 AM
 *
 */
case class PhongBang(
                      id: Option[Long] = None,
                      donViId: Long,
                      name: String
                      ) extends WithId[Long]

class PhongBangs(tag: Tag) extends AbstractTable[PhongBang](tag, "phongBang") {

  def donViId = column[Long]("donViId", O.NotNull)

  def donVi = foreignKey("doi_vi_phong_bang_fk", donViId, DonVis)(_.id)

  def name = column[String]("name", O.NotNull)

  def * = (id.?, donViId, name) <>(PhongBang.tupled, PhongBang.unapply)
}

object PhongBangs extends AbstractQuery[PhongBang, PhongBangs](new PhongBangs(_)) {

  def editForm = Form(
    mapping(
      "id" -> optional(longNumber),
      "donViId" -> longNumber,
      "name" -> text
    )(PhongBang.apply)(PhongBang.unapply)
  )

  implicit val phongBangJsonFormat = Json.format[PhongBang]

  def load(pagingDto: PagingDto)(implicit session: Session): ExtGirdDto[PhongBangDto] = {
    var query = for (phongBang <- this; donVi <- phongBang.donVi) yield (donVi, phongBang)
    pagingDto.filters.foreach(filter => {
      query = query.where(table => {
        val (donVi, phongBang) = table
        filter.property match {
          case "name" => phongBang.name.toLowerCase like filter.asLikeValue
          case _ => throw new Exception("Invalid filtering key: " + filter.property)
        }
      })
    })

    pagingDto.sorts.foreach(sort => {
      query = query.sortBy(table => {
        val (donVi, phongBang) = table
        sort.property match {
          case "name" => orderColumn(sort.direction, phongBang.name)
          case "donVi.name" => orderColumn(sort.direction, donVi.name)
          case _ => throw new Exception("Invalid sorting key: " + sort.property)
        }
      })
    })

    val totalRow = Query(query.length).first()

    val rows = query
      .drop(pagingDto.start)
      .take(pagingDto.limit)
      .list
      .map(PhongBangDto.apply)

    ExtGirdDto[PhongBangDto](
      total = totalRow,
      data = rows
    )
  }
}