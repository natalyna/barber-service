package com.h2osis.model

import com.h2osis.auth.Role
import com.h2osis.auth.User
import com.h2osis.auth.UserRole
import com.h2osis.constant.AuthKeys
import com.h2osis.utils.BarberSecurityService
import com.h2osis.utils.SearchService
import grails.converters.JSON
import grails.transaction.Transactional

class UserRestController {

    SearchService searchService
    def springSecurityService
    BarberSecurityService barberSecurityService
    static allowedMethods = [choose: ['POST', 'GET']]

    def get() {
        if (params.id) {
            User user = User.get(params.id)
            if (user) {
                user.setPassword(null)
                List<WorkTime> workTimes = WorkTime.findAllByMaster(user)
                Map<Integer, List<WorkTime>> worktTmesMap = new HashMap<Integer, List<WorkTime>>()
                if (workTimes) {
                    workTimes.each {
                        if (!worktTmesMap.get(it.dayOfWeek)) {
                            worktTmesMap.put(it.dayOfWeek, new ArrayList<WorkTime>())
                        }
                        worktTmesMap.get(it.dayOfWeek).add(it)
                    }
                }
                worktTmesMap.each {
                    it.value = it.value.sort {
                        it.timeFrom
                    }
                }

                render([user: user, holidays: Holiday.findAllByMaster(user), worktTmesMap: worktTmesMap] as JSON)
            } else {
                render([msg: g.message(code: "user.get.user.not.found")] as JSON)
            }
        } else {
            render([msg: g.message(code: "user.get.id.null")] as JSON)
        }
    }

    def save() {
        if (params.id) {
            User user = User.get(params.id)
            if (user) {
                if (params.firstName) {
                    user.setFirstname(params.firstName)
                }
                if (params.secondName) {
                    user.setSecondname(params.secondName)
                }
                if (params.worktimes) {
                    List<Long> workTimesIds = new ArrayList<Long>()
                    params.worktimes.split(",").each {
                        workTimesIds.add(Long.parseLong(it))
                    }
                    Set<WorkTime> workTimes = WorkTime.findAllByIdInList(workTimesIds)
                    if (workTimes) {
                        Set<WorkTime> oldWorkTimes = WorkTime.findAllByMaster(user)
                        if (oldWorkTimes) {
                            oldWorkTimes.each {
                                it.setMaster(null)
                                it.save(flush: true)
                            }
                        }
                        workTimes.each {
                            it.setMaster(user)
                            it.save(flush: true)
                        }
                    }

                }

                if (params.holydays) {
                    List<Long> holydaysIds = new ArrayList<Long>()
                    params.holydays.split(",").each {
                        holydaysIds.add(Long.parseLong(it))
                    }
                    Set<Holiday> holydays = Holiday.findAllByIdInList(holydaysIds)
                    if (holydays) {
                        Set<Holiday> oldholydays = Holiday.findAllByMaster(user)
                        if (oldholydays) {
                            oldholydays.each {
                                it.setMaster(null)
                                it.save(flush: true)
                            }
                        }
                        holydays.each {
                            it.setMaster(user)
                            it.save(flush: true)
                        }
                    }
                }

                if (params.businessId) {
                    Business business = Business.get(params.businessId)
                    if (business) {
                        Business.findAllByMasters([user])?.each {
                            it.removeFromMasters(user)
                        }
                        business.addToMasters(user)
                        business.save(flush: true)
                    }
                }
                if (params.firstName || params.secondName) {
                    user.save(flush: true)
                }
                render([code: 0] as JSON)
            } else {
                render([msg: g.message(code: "user.get.user.not.found")] as JSON)
            }
        } else {
            render([msg: g.message(code: "user.get.id.null")] as JSON)
        }
    }

    def find() {
        if (params.value) {
            String value = params.value
            List<User> listOfUsers = searchService.userSearch(value)
            if (listOfUsers) {
                listOfUsers.each { it -> it.setPassword(null) }
                render(listOfUsers as JSON)
            } else {
                render([msg: g.message(code: "user.fine.not.found")] as JSON)
            }
        } else {
            render([msg: g.message(code: "find.value.null")] as JSON)
        }
    }

    def block() {
        def principal = springSecurityService.principal
        User user = User.get(principal.id)
        if (user.authorities.contains(Role.findByAuthority(AuthKeys.ADMIN))) {
            if (params.id) {
                User blockingUser = User.get(params.id)
                if (blockingUser) {
                    blockingUser.setEnabled(false)
                    blockingUser.setAccountLocked(true)
                    blockingUser.save(flush: true)
                    render([code: 0] as JSON)
                } else {
                    render([msg: g.message(code: "user.get.user.not.found")] as JSON)
                }
            } else {
                render([msg: g.message(code: "user.get.id.null")] as JSON)
            }
        } else {
            render([msg: g.message(code: "user.block.not.admin")] as JSON)
        }
    }

    def getWorktimes() {
        if (params.id) {
            User user = User.get(params.id)
            if (user) {
                user.setPassword(null)
                List<WorkTime> workTimes = WorkTime.findAllByMaster(user)
                Map<Integer, List<WorkTime>> worktTmesMap = new HashMap<Integer, List<WorkTime>>()
                if (workTimes) {
                    workTimes.each {
                        if (!worktTmesMap.get(it.dayOfWeek)) {
                            worktTmesMap.put(it.dayOfWeek, new ArrayList<WorkTime>())
                        }
                        worktTmesMap.get(it.dayOfWeek).add(it)
                    }
                }
                worktTmesMap.each {
                    it.value = it.value.sort {
                        it.timeFrom
                    }
                }
                render(view: "/user/worktime", model: [worktTmesMap: worktTmesMap])
            } else {
                render([msg: g.message(code: "user.get.user.not.found")] as JSON)
            }
        } else {
            render([msg: g.message(code: "user.get.id.null")] as JSON)
        }
    }

    def getHolidays() {
        if (params.id) {
            User user = User.get(params.id)
            if (user) {
                user.setPassword(null)
                render(view: "/user/holidays", model: [holidays: Holiday.findAllByMaster(user, [sort: 'dateFrom'])])
            } else {
                render([msg: g.message(code: "user.get.user.not.found")] as JSON)
            }
        } else {
            render([msg: g.message(code: "user.get.id.null")] as JSON)
        }
    }

    def getHolidaysJson() {
        if (params.id) {
            User user = User.get(params.id)
            if (user) {
                user.setPassword(null)
                Set<WorkTime> workTimes = WorkTime.findAllByMaster(user)
                Set<Integer> workDays = new HashSet<Integer>()
                workTimes?.each {
                    workDays.add(it.dayOfWeek)
                }
                Set<Integer> nonWorkDays = workDays ? [0, 1, 2, 3, 4, 5, 6].minus(workDays) : [0, 1, 2, 3, 4, 5, 6]
                nonWorkDays.each { it++ }
                render([holidays: Holiday.findAllByMaster(user, [sort: 'dateFrom']), nonWorkDays: nonWorkDays] as JSON)
            } else {
                render([msg: g.message(code: "user.get.user.not.found")] as JSON)
            }
        } else {
            render([msg: g.message(code: "user.get.id.null")] as JSON)
        }
    }

    @Transactional
    def saveWorkTime() {
        WorkTime workTime = new WorkTime()

        if (params.id) {
            workTime = WorkTime.get(params.id)
        }

        if (params.dayOfWeek && params.timeFrom && params.timeTo && params.master) {
            workTime.setTimeFrom(params.timeFrom)
            workTime.setTimeTo(params.timeTo)
            workTime.setMaster(User.get(params.master))
            workTime.setDayOfWeek(Integer.parseInt(params.dayOfWeek))
            workTime.save(flush: true)
            render([id: workTime.id] as JSON)
        } else {
            render([msg: g.message(code: "workTime.params.null")] as JSON)
        }
    }

    @Transactional
    def saveHoliday() {
        Holiday holiday = new Holiday()

        if (params.id) {
            holiday = Holiday.get(params.id)
        }

        if (params.dateFrom && params.dateTo && params.master) {
            Date dateFrom = Date.parse('dd.MM.yyyy', params.dateFrom)
            Date dateTo = Date.parse('dd.MM.yyyy', params.dateTo)

            holiday.setMaster(User.get(params.master))
            holiday.setDateFrom(dateFrom)
            holiday.setDateTo(dateTo)
            holiday.setComment(params.comment)
            holiday.save(flush: true)
            render([id: holiday.id] as JSON)
        } else {
            render([msg: g.message(code: "holiday.params.null")] as JSON)
        }
    }

    @Transactional
    def deleteWorkTime() {
        if (params.id) {
            WorkTime workTime = WorkTime.get(params.id)
            if (workTime) {
                workTime.delete(flush: true)
            }
            render([code: 0] as JSON)
        } else {
            render([msg: g.message(code: "params.id.null")] as JSON)
        }
    }

    @Transactional
    def deleteHoliday() {
        if (params.id) {
            Holiday holiday = Holiday.get(params.id)
            if (holiday) {
                holiday.delete(flush: true)
            }
            render([code: 0] as JSON)
        } else {
            render([msg: g.message(code: "params.id.null")] as JSON)
        }
    }

    @Transactional
    def saveByPhone() {
        if (params.phone) {
            if (!User.findByPhone(params.phone)) {
                User user = new User()
                user.setPhone(params.phone)
                String pass = barberSecurityService.generator((('A'..'Z') + ('0'..'9') + ['!', '?']).join(), 6)
                user.setPassword(pass)
                user.save(flush: true)
                if (params.businessId) {
                    Business business = Business.get(params.businessId)
                    if (business) {

                        Business.findAllByMasters([user])?.each {
                            it.removeFromMasters(user)
                        }

                        Business.findAllByClients([user])?.each {
                            it.removeFromClients(user)
                        }

                        if (params.userRole) {
                            business.addToClients(user)
                        } else if (params.masterRole) {
                            business.addToMasters(user)
                        }
                        business.save(flush: true)

                    }
                }
                String authority = params.masterRole ? AuthKeys.ADMIN : (params.userRole ? AuthKeys.USER : null)
                if (authority) {
                    Role role = Role.findByAuthority(authority)
                    new UserRole(user: user, role: role).save(flush: true);
                }
                render([id: user.id] as JSON)
            } else {
                render([msg: g.message(code: "user.double.phone")] as JSON)
            }
        } else {
            render([msg: g.message(code: "user.phone.null")] as JSON)
        }
    }

    @Transactional
    def blockUser() {
        if (params.id) {
            def principal = springSecurityService.principal
            User master = User.get(principal.id)
            String authorities = springSecurityService?.authentication?.authorities?.toString()
            if (master && authorities.contains("ROLE_ADMIN")) {
                UserBlockFact userBlockFact = new UserBlockFact()
                userBlockFact.setComment(params.comment)
                userBlockFact.setMaster(master)
                User user = User.get(params.id)
                if (user && !UserBlockFact.findByMasterAndUser(master, user)) {
                    userBlockFact.setUser(User)
                    userBlockFact.save(flush: true)
                } else {
                    render([msg: g.message(code: "user.block.user.not.found")] as JSON)
                }
            } else {
                render([msg: g.message(code: "user.block.id.null")] as JSON)
            }
        } else {
            render([msg: g.message(code: "user.block.not.master")] as JSON)
        }
    }

    @Transactional
    def unBlockUser() {
        if (params.id) {
            def principal = springSecurityService.principal
            User master = User.get(principal.id)
            String authorities = springSecurityService?.authentication?.authorities?.toString()
            if (master && authorities.contains("ROLE_ADMIN")) {
                User user = User.get(params.id)
                UserBlockFact userBlockFact = UserBlockFact.findByMasterAndUser(master, user)
                if (user && userBlockFact) {
                    userBlockFact.delete(flush: true)
                } else {
                    render([msg: g.message(code: "user.block.user.not.found")] as JSON)
                }
            } else {
                render([msg: g.message(code: "user.block.id.null")] as JSON)
            }
        } else {
            render([msg: g.message(code: "user.block.not.master")] as JSON)
        }
    }
}
