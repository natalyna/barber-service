package com.h2osis.model.ajax

import com.h2osis.auth.Role
import com.h2osis.auth.User
import com.h2osis.auth.UserRole
import com.h2osis.model.NovaSelectorService
import com.h2osis.model.Ticket
import com.h2osis.model.UsersService
import com.h2osis.utils.BarberSecurityService
import com.h2osis.utils.NovaDateUtilService
import com.h2osis.utils.NovaUtilsService
import com.h2osis.utils.SearchService
import constant.AuthKeys
import constant.TicketStatus
import grails.converters.JSON

class MasterAjaxController {

    SearchService searchService
    def springSecurityService
    BarberSecurityService barberSecurityService
    UsersService usersService
    NovaUtilsService novaUtilsService
    NovaDateUtilService novaDateUtilService
    NovaSelectorService novaSelectorService
    static allowedMethods = [choose: ['POST', 'GET']]

    def create() {
        def errors = []
        def data = request.JSON.data
        def attrs = data.attributes
        def relationships = data.relationships
        if (attrs.phone && ((attrs.password && attrs.rpassword) || (attrs.password && !attrs.rpassword) || (!attrs.password && !attrs.rpassword))) {
            if (attrs.password.equals(attrs.rpassword) || (attrs.password && !attrs.rpassword) || (!attrs.password && !attrs.rpassword)) {
                attrs.type = "master"
                def result = usersService.createUser(attrs, relationships)
                if (result instanceof User) {
                    //result.setPassword(null)
                    Role role = Role.findByAuthority(AuthKeys.MASTER)
                    new UserRole(user: result, role: role).save(flush: true);
                    render(template: "/user/user", model: [user: result, type: "master"])
                } else {
                    errors.add([
                            "status": 422,
                            "detail": result,
                            "source": [
                                    "pointer": "data"
                            ]
                    ])
                    render([errors: errors] as JSON)
                }
            } else {
                errors.add([
                        "status": 422,
                        "detail": g.message(code: "auth.reg.pass2.fail"),
                        "source": [
                                "pointer": "data"
                        ]
                    ])
                response.status = 422
                render([errors: errors] as JSON)
            }
        } else {
            errors.add([
                    "status": 422,
                    "detail": g.message(code: "user.phone.and.pass.null"),
                    "source": [
                            "pointer": "data"
                    ]
                ])
            response.status = 422
            render([errors: errors] as JSON)
        }
    }

    def get(params) {
        def data = params
        if (data && data.id) {
            User user = User.get(data.id)
            if (user) {
                user.setPassword(null)
                render(template: "/user/user", model: [user: user, type: "master", business: user.business])
            } else {
                render([errors: { g.message(code: "user.get.user.not.found") }] as JSON)
            }
        } else {
            if (data && data.phone) {
                User user = User.findByPhone(data.phone)
                if (!user) {
                    user = User.findByPhone(novaUtilsService.getFullPhone(data.phone))
                }
                if (user) {
                    user.setPassword(null)
                    render(template: "/user/user", model: [user: user, type: "master", business: user.business])
                } else {
                    render([errors:
                            novaUtilsService.getErrorsSingleArrayJSON(g.message(code: "user.get.user.by.phone.not.found"))] as JSON)
                }
            } else {
                render([errors: novaUtilsService.getErrorsSingleArrayJSON(g.message(code: "user.get.id.null"))] as JSON)
            }
        }
    }

    def update() {
        def data = request.JSON.data
        if (data.id) {
            User user = User.get(data.id)
            if (user) {
                usersService.saveUser(data.attributes, user)
                render(template: "/user/user", model: [user: user, type: "master"])
            } else {
                render([errors: { g.message(code: "user.get.user.not.found") }] as JSON)
            }
        } else {
            render([errors: { g.message(code: "user.get.id.null") }] as JSON)
        }
    }

    def list() {
        def principal = springSecurityService.principal
        User curUser = User.get(principal.id)

        List<User> userList = new ArrayList<>()
        userList.addAll(novaSelectorService.getCoMasters(curUser))
        if (userList) {
            JSON.use('masters') {
                render([data: userList.findAll { it.enabled == true }] as JSON)
            }
        } else {
            render([errors: { g.message(code: "user.fine.not.found") }] as JSON)
        }
    }

    def destroy(params) {
        def data = params
        if (data.id) {
            User user = User.get(data.id)
            if (user) {
                user.setEnabled(false)
                user.save(flush: true)
                render([errors: []] as JSON)

            } else {
                render([errors: { g.message(code: "user.get.user.not.found") }] as JSON)
            }
        } else {
            render([errors: { g.message(code: "user.get.id.null") }] as JSON)
        }
    }

    def clientStatistic() {
        def data = request.JSON.query
        if (data.id) {
            User user = User.get(data.id)
            user = user == null ?
            User.get(springSecurityService.principal.id) : user
            if (user) {
                def result = Ticket.executeQuery("select user from Ticket where master_id = $user and type = 'HEAD' group by user_id ")
                JSON.use('clients') {
                    if(data.noUserList){
                        render([cnt: result?.size()] as JSON)
                    }else {
                        render([data: result, cnt: result?.size()] as JSON)
                    }
                }
            } else {
                render([errors: { g.message(code: "user.get.user.not.found") }] as JSON)
            }
        } else {
            render([errors: { g.message(code: "user.get.id.null") }] as JSON)
        }
    }

    def payStatistic(){
        def data = request.JSON.query
        if (data.id) {
            User user = User.get(data.id)
            user = user == null ?
            User.get(springSecurityService.principal.id) : user
            if (user) {
                Date dateFrom = novaDateUtilService.getMasterTZDateTimeDDMMYYYY(data.dateFrom, user).toDate()
                Date dateTo = novaDateUtilService.getMasterTZDateTimeDDMMYYYY(data.dateTo, user).toDate()
                String ticketStatus = data.ticketStatus ? data.ticketStatus : TicketStatus.ACCEPTED
                def costAVG = Ticket.executeQuery("select avg(cost) from Ticket where master_id = $user and ticketDate between $dateFrom and $dateTo and status = $ticketStatus")
                def costSUMM = Ticket.executeQuery("select sum(cost) from Ticket where master_id = $user and ticketDate between $dateFrom and $dateTo and status = $ticketStatus")
                render([costAVG: costAVG?.get(0), costSUMM:costSUMM?.get(0)] as JSON)
            } else {
                render([errors: { g.message(code: "user.get.user.not.found") }] as JSON)
            }
        } else {
            render([errors: { g.message(code: "user.get.id.null") }] as JSON)
        }
    }
}
