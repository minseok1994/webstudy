package com.example.miniproject.config.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.miniproject.model.entity.UsersEntity;

public class PrincipalDetails implements UserDetails {

    private UsersEntity usersEntity;

    public PrincipalDetails(UsersEntity usersEntity) {
        this.usersEntity = usersEntity;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();
        // collect.add(new SimpleGrantedAuthority(user.getRole()));
        collect.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {
                return usersEntity.getRole();
            }

        });

        return collect;
    }

    @Override
    public String getPassword() {
        return usersEntity.getPassword();
    }

    @Override
    public String getUsername() {
        return usersEntity.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        // 계정 만료 유무 확인
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // 계정 잠긴 유무 확인
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // 계정 비번 오래 사용했는지 유무 확인
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 활성화된 계정인지 유무 확인
        return true;
    }

}