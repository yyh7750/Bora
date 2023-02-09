package com.ssafy.bora.repository.broadcast;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.bora.dto.main.BroadcastDTO;
import com.ssafy.bora.dto.main.OrderCondition;
import com.ssafy.bora.dto.main.QBroadcastDTO;
import com.ssafy.bora.dto.main.SearchCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.ssafy.bora.entity.QBroadcast.broadcast;
import static com.ssafy.bora.entity.QStation.station;
import static com.ssafy.bora.entity.follow.QFollow.follow;

@RequiredArgsConstructor
public class BroadcastRepositoryCustomImpl implements BroadcastRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<BroadcastDTO> findAllByCategoryAndSort(SearchCondition condition, String sortCondition) {
        BooleanBuilder searchBuilder = searchMoodByBuilder(condition);
        OrderSpecifier[] orderSpecifiers = createOrderSpecifier(sortCondition);
        return queryFactory
                .select(new QBroadcastDTO(
                        broadcast.user.id,
                        broadcast.user.nickName,
                        station.name,
                        broadcast.title,
                        broadcast.mood,
                        station.category,
                        broadcast.sessionId,
                        broadcast.startBroad))
                .from(broadcast)
                .join(station).on(broadcast.user.eq(station.user))
                .join(follow).on(broadcast.user.eq(follow.dj))
                .where(
                        broadcast.endBroad.isNull(),
                        searchBuilder)
                .orderBy(orderSpecifiers)
                .fetch();
    }

    //    private BooleanExpression categoryEq(String category){
//        return StringUtils.hasText(category)?station.category.eq(category) :null;
//    }
//    private BooleanExpression moodAEq(String moodA){
//        return StringUtils.hasText(moodA)?broadcast.mood.contains(moodA) :null;
//    }
//    private BooleanExpression moodBEq(String moodB){
//        return StringUtils.hasText(moodB)?broadcast.mood.contains(moodB) :null;
//    }
//    private BooleanExpression moodCEq(String moodC){
//        return StringUtils.hasText(moodC)?broadcast.mood.contains(moodC) :null;
//    }
    private BooleanBuilder searchMoodByBuilder(SearchCondition condition) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (StringUtils.hasText(condition.getCategory()))
            booleanBuilder.and(station.category.contains(condition.getCategory()));
        if (StringUtils.hasText(condition.getMoodA())) booleanBuilder.or(broadcast.mood.contains(condition.getMoodA()));
        if (StringUtils.hasText(condition.getMoodB())) booleanBuilder.or(broadcast.mood.contains(condition.getMoodB()));
        if (StringUtils.hasText(condition.getMoodC())) booleanBuilder.or(broadcast.mood.contains(condition.getMoodC()));
        if (StringUtils.hasText(condition.getMoodD())) booleanBuilder.or(broadcast.mood.contains(condition.getMoodD()));
        if (StringUtils.hasText(condition.getMoodE())) booleanBuilder.or(broadcast.mood.contains(condition.getMoodE()));
        if (StringUtils.hasText(condition.getMoodF())) booleanBuilder.or(broadcast.mood.contains(condition.getMoodF()));
        return booleanBuilder;
    }

    private OrderSpecifier[] createOrderSpecifier(String condition) {
        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();
        if (Objects.isNull(condition)) orderSpecifiers.add(new OrderSpecifier(Order.DESC, broadcast.startBroad));
        else if (condition.equals("maxview"))
            orderSpecifiers.add((new OrderSpecifier(Order.DESC, broadcast.maxViewer)));
//        else if(condition.equals("follow")) orderSpecifiers.add((new OrderSpecifier(Order.DESC, ));
        return orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]);
    }
}
